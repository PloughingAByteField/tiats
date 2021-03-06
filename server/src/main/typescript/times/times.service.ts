import { EventEmitter, Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { EntryTime } from './entry-time.model';
import { Race } from '../races/race.model';

import { TimesHttpService } from './times-http.service';
import { RaceTimesSubject } from './race-times-subject.model';
import { Data } from '../model/data.model';

@Injectable()
export class TimesService {
    protected raceEntries: RaceTimesSubject[]
        = new Array<RaceTimesSubject>();

    constructor(protected service: TimesHttpService) {}

    public getTimesForRace(race: Race): BehaviorSubject<EntryTime[]> {
        const subject: RaceTimesSubject
            = this.raceEntries.filter((s: RaceTimesSubject) => {
                if (s.race.id === race.id) {
                    return;
                }
            }).shift();

        if (subject) {
            return subject.subject;
        } else {
            const raceTimesSubject: RaceTimesSubject = new RaceTimesSubject();
            raceTimesSubject.race = race;
            this.raceEntries.push(raceTimesSubject);
            this.service.getTimesForRace(race).subscribe((data: Data) => {
                raceTimesSubject.times = data.data;
                raceTimesSubject.subject.next(raceTimesSubject.times);
            });
            return raceTimesSubject.subject;
        }
    }

    public refreshForRace(race: Race): void {
        const subject: RaceTimesSubject
                = this.raceEntries.filter((s: RaceTimesSubject) => s.race.id === race.id).shift();
        if (subject) {
            this.service.getTimesForRace(race).subscribe((data: Data) => {
                subject.times = data.data;
                subject.subject.next(subject.times);
            });
        }
    }
}
