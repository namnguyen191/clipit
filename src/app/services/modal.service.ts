import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

export interface IModal {
  isVisible: boolean;
  id: string;
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private _modals: IModal[] = [];
  private _modalsSubject: BehaviorSubject<IModal[]> = new BehaviorSubject<
    IModal[]
  >([]);

  constructor() {}

  registerModal(id: string) {
    if (this._modals.findIndex((modal) => modal.id === id) >= 0) {
      throw Error(
        `This modal has already been used: ${id}. Please use a different one.`
      );
    }

    this._modals.push({
      id,
      isVisible: false
    });

    this._modalsSubject.next(this._modals);
  }

  unregisteredModal(id: string) {
    this._modals = this._modals.filter((modal) => modal.id !== id);
    this._modalsSubject.next(this._modals);
  }

  toggleModal(id: string): void {
    const modal = this._getModal(id);

    modal.isVisible = !modal.isVisible;

    this._modalsSubject.next(this._modals);
  }

  showModal(id: string): void {
    const modal = this._getModal(id);

    modal.isVisible = true;

    this._modalsSubject.next(this._modals);
  }

  hideModal(id: string): void {
    const modal = this._getModal(id);

    modal.isVisible = false;

    this._modalsSubject.next(this._modals);
  }

  /**
   *
   * @param id
   * @returns a subscription to a modal with the given id
   */
  getModalSubscription(id: string): Observable<IModal> {
    return this._modalsSubject.asObservable().pipe(
      map((modals) => {
        const modal = modals.find((modal) => modal.id === id);
        if (!modal) throw Error(`Cannot find modal with ID: ${id}`);
        return modal;
      })
    );
  }

  private _getModal(id: string): IModal {
    const modal = this._modals.find((modals) => modals.id === id);

    if (!modal) throw Error(`No modal with given id: ${id}`);

    return modal;
  }
}
