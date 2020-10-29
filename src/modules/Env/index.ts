export interface IEnv {
  db: {
    url: string;
  }
  express: {
    port: number;
  }
  monitoring: {
    api: 'address';
  }
}
