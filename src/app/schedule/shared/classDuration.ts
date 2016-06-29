export class ClassDuration {
  constructor(public from: Date, public to: Date) { }

  static dateFromHourAndMinute(hour: number, minute: number): Date {
    var today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), today.getDate(), hour, minute);
  }

  static importFromClassDurationNumbers(classDurationNumbers: Array<Array<Array<number>>>):Array<ClassDuration>{
    var classDurations:Array<ClassDuration> = [];
    for(var i:number=0; i<classDurationNumbers.length;i++){
      var classDuration = new ClassDuration(
        ClassDuration.dateFromHourAndMinute(classDurationNumbers[i][0][0], classDurationNumbers[i][0][1]),
        ClassDuration.dateFromHourAndMinute(classDurationNumbers[i][1][0], classDurationNumbers[i][1][1])
      );
      classDurations.push(classDuration);
    }
    return classDurations;
  }
}