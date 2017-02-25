export class ClassDuration {
  public from: Date;
  public to: Date;

  constructor(classDurationNumbers:Array<Array<number>>) {
    this.from = ClassDuration.dateFromHourAndMinute(classDurationNumbers[0][0], classDurationNumbers[0][1]);
    this.to = ClassDuration.dateFromHourAndMinute(classDurationNumbers[1][0], classDurationNumbers[1][1]);
  }

  static dateFromHourAndMinute(hour: number, minute: number): Date {
    var today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), today.getDate(), hour, minute);
  }

  static importFromClassDurationNumbers(classDurationNumbers: Array<Array<Array<number>>>):Array<ClassDuration>{
    var classDurations:Array<ClassDuration> = [];
    for(var i:number=0; i<classDurationNumbers.length;i++){
      classDurations.push(new ClassDuration(classDurationNumbers[i]));
    }
    return classDurations;
  }
}