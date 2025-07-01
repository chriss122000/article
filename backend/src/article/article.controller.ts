import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpException,
    HttpStatus,
    InternalServerErrorException,
    Param,
    Post,
    Put,
    UseGuards,
  } from '@nestjs/common';
  import { ArticleService } from './article.service';
  import { Article } from './article.entity';
  import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
  
  @Controller('articles')
  export class ArticleController {
    constructor(private readonly articleService: ArticleService) {}
  
    //get all articles from article table
    @UseGuards(JwtAuthGuard)
    @Get()
    async findAllArticles(): Promise<Article[]> {
      return this.articleService.findAllArticles();
    }
  
    //get one article from article table
    @UseGuards(JwtAuthGuard)
    @Get(':id_article')
    async findOneArticle(
      @Param('id_article') id_article: number,
    ): Promise<Article> {
      return this.articleService.findOneArticle(id_article);
    }
  
    //create one article
    @UseGuards(JwtAuthGuard)
    @Post()
    @HttpCode(HttpStatus.OK)
    async createArticle(@Body() articleData: Partial<Article>): Promise<Article> {
      try {
        return await this.articleService.createArticle(articleData);
      } catch (error) {
        if (error instanceof InternalServerErrorException) {
          throw new HttpException(
            error.message,
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        } else {
          throw new HttpException('Invalid article data', HttpStatus.BAD_REQUEST);
        }
      }
    }
  
    //update one article
    @UseGuards(JwtAuthGuard)
    @Put(':id_article')
    @HttpCode(HttpStatus.OK)
    async updateArticle(
      @Param('id_article') id_article: number,
      @Body() articleData: Partial<Article>,
    ): Promise<Article> {
      try {
        return this.articleService.updateArticle(id_article, articleData);
      } catch (error) {
        if (error instanceof InternalServerErrorException) {
          throw new HttpException(
            error.message,
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        } else {
          throw new HttpException('Invalid article data', HttpStatus.BAD_REQUEST);
        }
      }
    }
  
    //delete one article
    @UseGuards(JwtAuthGuard)
    @Delete(':id_article')
    @HttpCode(HttpStatus.OK)
    async deleteArticle(
      @Param('id_article') id_article: number,
    ): Promise<Article> {
      try {
        return this.articleService.deleteArticle(id_article);
      } catch (error) {
        if (error instanceof InternalServerErrorException) {
          throw new HttpException(
            error.message,
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        } else {
          throw new HttpException('Invalid article data', HttpStatus.BAD_REQUEST);
        }
      }
    }
  }
