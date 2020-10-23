import { Application } from '../declarations';
import users from './users/users.service';
import companies from './companies/companies.service';
import cities from './cities/cities.service';
import students from './students/students.service';
import companyCity from './company-city/company-city.service';
import vacancies from './vacancies/vacancies.service';
import specializations from './specializations/specializations.service';
import universities from './universities/universities.service';
import studentFeedbacks from './student-feedbacks/student-feedbacks.service';
import studentVacancy from './student-vacancy/student-vacancy.service';
import vacancyFeedbacks from './vacancy-feedbacks/vacancy-feedbacks.service';
import studentSpecialization from './student-specialization/student-specialization.service';
import universityVacancy from './university-vacancy/university-vacancy.service';
import universitySpecialization from './university-specialization/university-specialization.service';
import workers from './workers/workers.service';
import studentUniversity from './student-university/student-university.service';
import vacancySpecialization from './vacancy-specialization/vacancy-specialization.service';
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application): void {
  app.configure(users);
  app.configure(companies);
  app.configure(cities);
  app.configure(students);
  app.configure(companyCity);
  app.configure(vacancies);
  app.configure(specializations);
  app.configure(universities);
  app.configure(studentFeedbacks);
  app.configure(studentVacancy);
  app.configure(vacancyFeedbacks);
  app.configure(studentSpecialization);
  app.configure(universityVacancy);
  app.configure(universitySpecialization);
  app.configure(workers);
  app.configure(studentUniversity);
  app.configure(vacancySpecialization);
}
