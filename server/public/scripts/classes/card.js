class Card {
    constructor(type, description, url, saveToPirateverse) {
        this.type = type;
        this.description = description;
        this.url = url;  //how do I make it optional?  if statement?
        this.savetopirateverse = saveToPirateverse;
        //https://stackoverflow.com/questions/31342290/es6-classes-default-value
    }
}