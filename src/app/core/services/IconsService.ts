import { Injectable } from '@angular/core';
import { IconDefinition } from '@fortawesome/free-regular-svg-icons';
import {
  faCartPlus,
  faChevronUp,
  faCirclePlus, faPencil,
  faQuestionCircle,
  faTrashArrowUp
} from '@fortawesome/free-solid-svg-icons';

@Injectable({
  providedIn: 'root'
})
export class IconsService {
  private icons: { [icon: string]: IconDefinition } = {
    question: faQuestionCircle,
    chevron: faChevronUp,
    trash: faTrashArrowUp,
    addProduct: faCartPlus,
    add: faCirclePlus,
    update: faPencil
  };

  public getIcon(name: string): IconDefinition {
    return this.icons[name];
  }
}
