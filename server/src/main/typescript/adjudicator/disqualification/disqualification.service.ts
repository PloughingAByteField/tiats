import { Injectable } from '@angular/core';

import { Disqualification, convertObjectToDisqualification }
    from '../../disqualification/disqualification.model';

import { DisqualificationService } from '../../disqualification/disqualification.service';

import { AdjudicatorHttpDisqualificationsService } from './disqualification-http.service';

import { Message } from '../../websocket/message.model';
import { MessageType } from '../../websocket/message-type.model';

@Injectable()
export class AdjudicatorDisqualificationService extends DisqualificationService {

    constructor(protected service: AdjudicatorHttpDisqualificationsService) {
        super(service);
    }

    public disqualify(disqualification: Disqualification): void {
        this.service.disqualify(disqualification).then(() => {
            this.disqualifications.push(disqualification);
            this.penaltiesSubject.next(this.disqualifications);
        });
    }

    public removeDisqualification(disqualification: Disqualification): void {
        this.service.removeDisqualification(disqualification).then(() => {
            let index = this.disqualifications.indexOf(disqualification);
            let sliced = this.disqualifications.splice(index, 1);
            this.penaltiesSubject.next(this.disqualifications);
        });
    }

    public updateDisqualification(disqualification: Disqualification): void {
        this.service.updateDisqualification(disqualification).then();
    }

    public processDisqualificationMessage(message: Message): void {
        console.log('process message');
        let disqualification: Disqualification = convertObjectToDisqualification(message.data);
        console.log(disqualification);
        if (message.type === MessageType.ADD) {
            this.disqualifications.push(disqualification);
        } else if (message.type === MessageType.DELETE) {
            let deletedPenalty: Disqualification =
                this.getDisqualificationForId(disqualification.id);
            if (deletedPenalty !== null) {
                let index = this.disqualifications.indexOf(deletedPenalty);
                let sliced = this.disqualifications.splice(index, 1);
            }
        } else if (message.type === MessageType.UPDATE) {
            let updatedPenalty: Disqualification =
                this.getDisqualificationForId(disqualification.id);
            if (updatedPenalty !== null) {
                updatedPenalty.comment = disqualification.comment;
                updatedPenalty.entry = disqualification.entry;
                updatedPenalty.note = disqualification.note;
            }
        }

        this.penaltiesSubject.next(this.disqualifications);
    }

    public getDisqualificationForId(disqualificationId: number): Disqualification {
        for (let disqualification of this.disqualifications) {
            if (disqualification.id === disqualificationId) {
                return disqualification;
            }
        }
        return null;
    }
}
