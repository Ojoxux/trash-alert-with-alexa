import { supabase } from '../db/supabase';
import { getCurrentDayOfWeek } from '../utils/date';
import { ScheduleResponse } from '../types';

export async function getTodayTrashSchedule(
  timestamp?: string
): Promise<string> {
  const startTime = Date.now();
  console.log('Function getTodayTrashSchedule started');

  try {
    const date = timestamp ? new Date(timestamp) : new Date();
    const dayOfWeek = getCurrentDayOfWeek(date);
    console.log('Current day of week:', dayOfWeek);

    const weekNumber = Math.ceil(date.getDate() / 7); // 今月の第何週目かを計算
    console.log('Week number of month:', weekNumber);

    console.log('Attempting to fetch data from Supabase...');
    const { data, error } = (await supabase
      .from('collection_schedules')
      .select(
        `
        trash_types!inner (
          name
        ),
        schedule_type
      `
      )
      .contains('day_of_week', [dayOfWeek])
      .or(
        `schedule_type.eq.weekly,and(schedule_type.eq.monthly,week_number.cs.{${weekNumber}})`
      )
      // 必要なカラムのみを取得
      .order('schedule_type')) as {
      data: ScheduleResponse[] | null;
      error: any;
    };

    console.log('Supabase response:', JSON.stringify({ data, error }, null, 2));

    if (error) {
      console.error('Supabase error:', JSON.stringify(error, null, 2));
      return '情報の取得に失敗しました';
    }

    // データがないとき(毎月金曜日と日曜日)には、"収集予定のゴミはありません"を返す
    if (!data || data.length === 0) {
      return '収集予定のゴミはありません';
    }

    // 複数のゴミ種別がある場合、カンマで区切って列挙
    const trashTypes = data
      .map((schedule) => schedule.trash_types?.name)
      .filter(Boolean)
      .join('と');

    console.log('Returning result:', trashTypes);

    const endTime = Date.now();
    console.log(`Function execution time: ${endTime - startTime}ms`);
    return trashTypes;
  } catch (error) {
    const endTime = Date.now();
    console.error(`Error execution time: ${endTime - startTime}ms`);
    console.error('Unexpected error:', JSON.stringify(error, null, 2));
    return 'ゴミ収集情報の取得に失敗しました';
  }
}
