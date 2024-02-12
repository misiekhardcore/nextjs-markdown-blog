export class StringService {
  static stringArrayToString(values: (string | undefined)[], separator = ' '): string {
    return values.filter((value) => value).join(separator);
  }

  static stringToSlug(string: string): string {
    return string
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/\//g, '-')
      .replace(/[^a-z0-9-]/g, '')
      .replace(/-{2,}/g, '-')
      .replace(/^-|-$/g, '');
  }
}
