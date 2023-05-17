import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { GetUser } from 'src/common/decorator/get-user.dacorator';
import { AuthGuard } from '@nestjs/passport';
import { CommentService } from '../service/comment.service';
import { CreateCommentDto } from '../dto/comment/create-comment.dto';
import { UpdateCommentDto } from '../dto/comment/update-comment.dto';
import { Auth } from 'src/auth/entity/user.entity';

@UseGuards(AuthGuard())
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}
  // @Post(':id')
  // create(
  //   @Param('id') id: string,
  //   @Body() comment: CreateCommentDto,
  //   @GetUser() user: Auth,
  // ) {
  //   return this.commentService.create(id, comment, user);
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.update(+id, updateCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentService.remove(+id);
  }
}
