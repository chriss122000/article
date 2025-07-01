import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './article.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
  ) {}

  //    get all articles from article table
  async findAllArticles(): Promise<Article[]> {
    return await this.articleRepository.find({
      where: { isDeleted: false },
    });
  }

  //   find one article
  async findOneArticle(id_article: number): Promise<Article> {
    return await this.articleRepository.findOneBy({ id_article: id_article });
  }

  //    create one article
  async createArticle(articleData: Partial<Article>): Promise<Article> {
    try {
      const { nom_article, quantity } = articleData;
      const article = this.articleRepository.create({
        nom_article: nom_article,
        quantity: quantity,
        isDeleted: false,
      });
      if (nom_article && quantity) {
        return await this.articleRepository.save(article);
      }
    } catch (error) {
      console.error('Error creating article:', error);
      throw new InternalServerErrorException('Failed to create article');
    }
  }

  //   update one article
  async updateArticle(
    id_article: number,
    articleData: Partial<Article>,
  ): Promise<Article> {
    try {
      const { nom_article, quantity } = articleData;
      if (nom_article && quantity) {
        await this.articleRepository.update(id_article, {
          nom_article,
          quantity,
        });
        return this.findOneArticle(id_article);
      }
    } catch (error) {
      console.error('Error creating article:', error);
      throw new InternalServerErrorException('Failed to update article');
    }
  }

  //   delete one article
  async deleteArticle(id_article: number): Promise<Article> {
    try {
      if (id_article) {
        const article = this.findOneArticle(id_article);
        await this.articleRepository.delete(id_article);
        return article;
      }
    } catch (error) {
      console.error('Error creating article:', error);
      throw new InternalServerErrorException('Failed to delete article');
    }
  }

  //   soft delete one article
  async softDeleteArticle(id_article: number): Promise<Article> {
    try {
      if (id_article) {
        await this.articleRepository.update(id_article, { isDeleted: true });
        return this.findOneArticle(id_article);
      }
    } catch (error) {
      console.error('Error creating article:', error);
      throw new InternalServerErrorException('Failed to delete article');
    }
  }
}