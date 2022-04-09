import { Injectable } from '@angular/core';
import { IconDefinition } from '@fortawesome/free-regular-svg-icons';
import { faChevronUp, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

@Injectable({
  providedIn: 'root'
})
export class IconsService {
  private icons: { [icon: string]: IconDefinition } = {
    question: faQuestionCircle,
     chevron: faChevronUp
  };

  public getIcon(name: string): IconDefinition {
    return this.icons[name];
  }
}
