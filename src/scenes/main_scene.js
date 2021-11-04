
export class MainScene extends Phaser.Scene
{
    constructor()
    {
        console.log("main")
        super("MainScene")

    }

    create()
    {
        const logo = this.add.image(400, 150, 'logo');
        console.log("main scene showns")
    }
}