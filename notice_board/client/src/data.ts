interface post {
  id: number;
  user: string;
  subject: string;
  mainText: string;
  createdAt: string;
}

let data: post[] = [
  {
    id: 1,
    user: "a",
    subject: "test",
    mainText: "blank",
    createdAt: "2021-08-11T12:37:56.749Z",
  },
  {
    id: 2,
    user: "b",
    subject: "test2",
    mainText: "blank",
    createdAt: "2021-08-11T12:37:56.749Z",
  },
  {
    id: 3,
    user: "c",
    subject: "test3",
    mainText: "blank",
    createdAt: "2021-08-11T12:37:56.749Z",
  },
  {
    id: 4,
    user: "d",
    subject: "test4",
    mainText: "blank",
    createdAt: "2021-08-11T12:37:56.749Z",
  },
];

export { data };
