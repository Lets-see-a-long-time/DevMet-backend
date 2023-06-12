import { Test, TestingModule } from '@nestjs/testing';
import { ProjectListRequest } from '../dto/request/project/projects.request';
import ProjectResponse from '../dto/response/project/project.response';
import ProjectsResponse from '../dto/response/project/projects.response';
import { Project } from '../entity/project.entity';
import { ProjectService } from '../service/project.service';
import { ProjectController } from './project.controller';

describe('ProjectController', () => {
  let controller: ProjectController;
  let service: ProjectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectController],
      providers: [ProjectService],
    }).compile();

    controller = module.get<ProjectController>(ProjectController);
    service = module.get<ProjectService>(ProjectService);
  });

  describe('getAllProjects', () => {
    it('should return an array of projects', async () => {
      const projectsResponse: ProjectsResponse = {
        projects: [ProjectResponse.fromProject(new Project())],
        countOfTotal: 2,
      };

      jest.spyOn(service, 'getAllProjects').mockResolvedValue(projectsResponse);

      const request: ProjectListRequest = {
        itemCount: 10,
        lastItemId: 1,
      };

      const result = await controller.getAllProjects(request);

      expect(result).toEqual(projectsResponse);
    });
  });
});
