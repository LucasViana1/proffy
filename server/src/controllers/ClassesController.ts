import { Request, Response } from 'express';

import db from '../database/connection';
import convertHourForMinutes from '../utils/convertHourForMinutes';

interface ScheduleItem {
  week_day: number;
  from: string;
  to: string;
}

export default class ClassesController {
  async index(request: Request, response: Response) {
    const filters = request.query;

    const week_day = filters.week_day as string;
    const subject = filters.subject as string;
    const time = filters.time as string;

    if (!filters.week_day || !filters.subject || !filters.time) {
      return response
        .status(400)
        .json({ error: 'Missing filters to search classes' });
    }

    const timeInMinutes = convertHourForMinutes(time);

    const classes = await db('classes')
      .whereExists(function () {
        this.select('class_schedule.*')
          .from('class_schedule')
          // validated filter for the week day
          .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
          .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
          // validated filter for the small time
          .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
          // validated filter for the bigger time
          .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes]);
      })
      .where('classes.subject', '=', subject)
      .join('users', 'classes.user_id', '=', 'users.id')
      .select('classes.*', 'users.*');

    return response.json(classes);
  }

  async create(request: Request, response: Response) {
    const {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost,
      schedule,
    } = request.body;

    const trx = await db.transaction();

    try {
      const insertedUsersIds = await trx('users').insert({
        name,
        avatar,
        whatsapp,
        bio,
      });

      const [user_id] = insertedUsersIds;

      const insertedClassesIds = await trx('classes').insert({
        subject,
        cost,
        user_id,
      });

      const [class_id] = insertedClassesIds;

      const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
        return {
          class_id,
          week_day: scheduleItem.week_day,
          from: convertHourForMinutes(scheduleItem.from),
          to: convertHourForMinutes(scheduleItem.to),
        };
      });

      await trx('class_schedule').insert(classSchedule);

      await trx.commit();

      return response.status(201).send();
    } catch (err) {
      await trx.rollback();

      return response
        .status(400)
        .json({ error: 'Unexpected error while creating new class' });
    }
  }
}
