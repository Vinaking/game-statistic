export class User {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
};

export class UserRank {
    constructor(id, name, mp, win, draw, lose, point, dif ) {
        this.id = id;
        this.name = name;
        this.mp = mp;
        this.win = win;
        this.draw = draw;
        this.lose = lose;
        this.point = point;
        this.dif = dif;
    }
};

