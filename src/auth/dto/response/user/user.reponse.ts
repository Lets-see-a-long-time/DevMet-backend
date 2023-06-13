import { IsArray, IsDate, IsNumber, IsString } from 'class-validator';
import { User } from 'src/auth/entity/user.entity';
import { ProviderProps, StackProps } from 'src/auth/types/userinfo.type';
import { ApiField } from 'src/common/decorator/api.decorator';
import { ProjectStackType } from 'src/common/enum/enum';
import { Favorites } from 'src/project/entity/favorite.entity';
import { Like } from 'src/project/entity/like.entity';
import { Project } from 'src/project/entity/project.entity';

export default class UserResponse {
  @ApiField({
    type: Number,
    description: '유저 아이디',
    nullable: false,
    example: '1...2....3',
  })
  @IsNumber()
  id: number;

  @ApiField({
    type: String,
    description: '유저이름',
    nullable: false,
    example: '김인태',
  })
  @IsString()
  name: string;

  @ApiField({
    type: String,
    description: 'provider에서 추출한 user 고유한 id',
    nullable: false,
    example: '849205801 (각 provider마다 형식이 상이함)',
  })
  @IsString()
  userId: string;

  @ApiField({
    type: String,
    description: '유저 이메일',
    nullable: false,
    example: 'rladslxo123@naver.com',
  })
  @IsString()
  email: string;

  @ApiField({
    type: String,
    description: '유저 프로필 이미지',
    nullable: false,
    example: 'http://aosidoaiuoi@akdlkadlkjalk/.. 링크 형식',
  })
  @IsString()
  image: string;

  @ApiField({
    type: String,
    description: '유저 닉네임 /register 단계에서 정해야함.',
    nullable: false,
    example: '수유사랑꾼백광현',
  })
  @IsString()
  nickname: string;

  @ApiField({
    type: String,
    description:
      '유저 직군 (front-end, back-end, designer 등.. 나중에 필요시에 리터럴 타입으로 정의) ',
    nullable: false,
    example: 'front-end',
  })
  @IsString()
  role: string;

  @ApiField({
    type: [ProjectStackType],
    description:
      '유저 스택 (figma, react,spring 등.. 나중에 필요시에 리터럴 타입으로 정의) ',
    nullable: false,
    example: 'react, vue, node.js ... 배열형식으로 정의 요망 ',
  })
  @IsString()
  stacks: ProjectStackType[];

  @ApiField({
    type: String,
    description: '유저 토큰 만료기간. ',
    nullable: false,
    example: '2023-05-18 16:41:44.566699',
  })
  @IsDate()
  expires: Date;

  @ApiField({
    type: String,
    description: '유저가 사용한 로그인 방법',
    nullable: false,
    example: 'kakao or naver',
  })
  @IsString()
  provider: ProviderProps;

  @ApiField({
    type: [Like],
    description: '내가 좋아요 누른 게시물',
    nullable: false,
    example: '',
  })
  @IsArray()
  likes: Like[];

  @ApiField({
    type: [String],
    description: '유저가 북마크한 게시물',
    nullable: false,
    example: '',
  })
  @IsArray()
  favorites: Favorites[];

  @ApiField({
    type: [String],
    description: '유저가 속해있는 프로젝트들의 집합',
    nullable: false,
    example: '',
  })
  @IsArray()
  projects: Project[];

  @ApiField({
    type: Date,
    description: '유저 생성 시간',
    nullable: false,
    example: '2023-05-18 16:41:44.566699',
  })
  @IsDate()
  createdAt: Date;

  @ApiField({
    type: Date,
    description: '유저 수정 시간',
    nullable: false,
    example: '2023-05-18 16:41:44.566699',
  })
  @IsDate()
  updatedAt: Date;

  /**
   * TODO : like와 favorite안에 무엇으로 들어가야할까?
   */
  static fromUser(user: User): UserResponse {
    const response = new UserResponse();
    response.id = user.id;
    response.name = user.name;
    response.userId = user.userId;
    response.email = user.email;
    response.image = user.image;
    response.role = user.role;
    // response.likes = user.likes.map((like) => like.projectId);
    // response.favorites = user.favorites.map((favorite) => favorite.projectId);
    response.nickname = user.nickname;
    response.expires = user.expires;
    response.provider = user.provider;
    response.createdAt = user.createdAt;
    response.updatedAt = user.updatedAt;
    return response;
  }
}
