import { Injectable } from '@nestjs/common';

import { CreateCommentDto } from '../dto/comment/create-comment.dto';
import { UpdateCommentDto } from '../dto/comment/update-comment.dto';
import { CommentRepository } from '../repository/comment.repository';

@Injectable()
export class CommentService {
  constructor(private commentRepository: CommentRepository) {}

  // async create(id: string, comment: CreateCommentDto, user: Auth) {
  //   const newComment = await this.commentRepository.create({
  //     ...comment,
  //     projectId: id,
  //     user: user,
  //   });
  //   console.log(newComment);
  //   return this.commentRepository.save(newComment);
  // }

  async findAll() {
    return this.commentRepository.find();
  }

  async findOne(id: number) {
    return this.commentRepository.findOneBy({ id });
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    await this.commentRepository.update(id, updateCommentDto);
    return this.commentRepository.findOneBy({ id });
  }

  async remove(id: number) {
    return this.commentRepository.delete(id);
  }
}
