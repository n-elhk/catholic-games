import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Word } from './word.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Word)
    private readonly wordsRepository: Repository<Word>,
  ) {}

  async getWordOfTheDay(): Promise<Word> {
    return this.wordsRepository.findOneBy({ isDisplay: true });
  }

  async getRandomWord() {
    return this.wordsRepository.createQueryBuilder("word")
      .where("word.displayed = :displayed", { displayed: false })
      .andWhere("word.isDisplay = :isDisplay", { isDisplay: false })
      .orderBy("RANDOM()")
      .limit(1)
      .getMany();
      // .getOne();
  }

  async changeWordDay(): Promise<Word> {
    await this.wordsRepository.update(
      { isDisplay: true },
      { isDisplay: false, displayed: true },
    );

    const toDisplay: Word[] = await this.getRandomWord();
    if (toDisplay.length === 0) {
      await this.resetWordOfTheDay(); // < Make sure this function throws if collection is empty (no quotes), otherwise this will be a stackoverflow (infinite loop)
      return this.changeWordDay();
    } else {
      const displayed_at = toDisplay[0].displayed_at;
      displayed_at.push(Date.now());
      await this.wordsRepository.update(
        { id: toDisplay[0].id },
        { displayed: true, isDisplay: true, displayed_at },
      );
      return toDisplay[0];
    }
  }

  async resetWordOfTheDay(): Promise<void> {
    const quotesUpdated = await this.wordsRepository.update(
      {},
      { displayed: false, isDisplay: false },
    );
    if (quotesUpdated.affected === 0) {
      throw new Error('No quotes found');
    }
  }
}
