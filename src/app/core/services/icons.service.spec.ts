import { IconsService } from './IconsService';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

describe('IconsService', () => {
  it('should return an icon', () => {
    const iconsService = new IconsService();

    const icon = iconsService.getIcon('okay');

    expect(icon).toBe(faCheck);
  });
})
