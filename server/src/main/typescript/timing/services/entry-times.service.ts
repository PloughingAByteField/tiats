import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';

import { EntriesService } from '../../services/entries.service';
import { TimesService } from '../../services/times.service';

import { EntryTime } from '../model/entry-time.model';
import { Position } from '../../models/position.model';
import { Entry } from '../../models/entry.model';
import { Race } from '../../models/race.model';
import { PositionTime } from '../../models/postion-time.model';

import { RaceEntryTimes } from '../model/race-entry-times.model';

@Injectable()
export class EntryTimesService {
    public  entryTimesSubject: Subject<EntryTime[]> =
        new BehaviorSubject<EntryTime[]>(new Array<EntryTime>());
    private raceEntries: RaceEntryTimes[] = new Array<RaceEntryTimes>();

    constructor(private entriesService: EntriesService, private timesService: TimesService) {}

    public getEntriesForRace(race: Race, position: Position): Subject<EntryTime[]> {
        if (race && position) {
            for (let entry of this.raceEntries) {
                if (entry.race.id === race.id) {
                    this.entryTimesSubject.next(entry.entries);
                    return this.entryTimesSubject;
                }
            }
        }

        if (race && position) {
            let raceEntryTimes: RaceEntryTimes = new RaceEntryTimes();
            raceEntryTimes.race = race;
            raceEntryTimes.entries = new Array<EntryTime>();
            let entriesObs = this.entriesService.getEntriesForRace(race);
            let positionTimesObs = this.timesService.getTimesForPositionInRace(position, race);
            Observable.forkJoin(entriesObs, positionTimesObs).subscribe((data) => {
                    let entries: Entry[] = data[0];
                    let positionTimes: PositionTime[] = data[1];
                    entries.forEach((entry: Entry) => {
                        let haveTime: boolean = false;
                        for (let positionTime of positionTimes) {
                            if (positionTime.position === position.id
                                && positionTime.entry === entry.id) {
                                let entryTime: EntryTime = new EntryTime();
                                entryTime.entry = entry;
                                entryTime.time = positionTime;
                                raceEntryTimes.entries.push(entryTime);
                                haveTime = true;
                                break;
                            }
                        }
                        if ( !haveTime) {
                            let entryTime: EntryTime = new EntryTime();
                            entryTime.entry = entry;
                            entryTime.time = new PositionTime();
                            raceEntryTimes.entries.push(entryTime);
                        }
                    });
                    this.entryTimesSubject.next(raceEntryTimes.entries);
            });
            this.raceEntries.push(raceEntryTimes);
        }

        return this.entryTimesSubject;
    }
}