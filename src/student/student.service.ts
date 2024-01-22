import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { CreateStudentInput } from './create-student.input';
import { Student } from './student.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: MongoRepository<Student>,
  ) {}

  async getStudents(): Promise<Student[]> {
    return this.studentRepository.find();
  }

  async getStudent(id: string): Promise<Student> {
    return this.studentRepository.findOne({ where: { id } });
  }

  async createStudent({
    firstName,
    lastName,
  }: CreateStudentInput): Promise<Student> {
    const student = this.studentRepository.create({
      id: uuid(),
      firstName,
      lastName,
    });
    return this.studentRepository.save(student);
  }

  async getManyStudents(studentIds: string[]): Promise<Student[]> {
    console.log('studentIds', studentIds);

    const result = await this.studentRepository.find({
      where: {
        id: {
          $in: studentIds,
        },
      },
    });

    console.log('result', result);

    return result;
  }
}
