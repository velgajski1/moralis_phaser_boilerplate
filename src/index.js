import Phaser from 'phaser';
import logoImg from './assets/logo.png';
import { MainScene } from './scenes/main_scene';

export class Button
{
    constructor(x, y, label, scene, callback)
    {
        const button = scene.add.text(x, y, label)
            .setOrigin(0.5)
            .setPadding(10)
            .setStyle({ backgroundColor: '#111' })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => callback())
            .on('pointerover', () => button.setStyle({ fill: '#f39c12' }))
            .on('pointerout', () => button.setStyle({ fill: '#FFF' }));
    }
}

export class MyGame extends Phaser.Scene
{
    constructor()
    {
        super();

    }

    preload()
    {
        Moralis.initialize("AzjcPDlHcKKRpkJCpqmohkj8rntH4fZz0TbLcjIS");
        Moralis.serverURL = "https://q7vcwzx5ivhl.usemoralis.com:2053/server";

        this.load.image('logo', logoImg);
    }

    create()
    {


        const logo = this.add.image(400, 150, 'logo');

        this.tweens.add({
            targets: logo,
            y: 450,
            duration: 2000,
            ease: "Power2",
            yoyo: true,
            loop: -1
        });

        let button = new Button(100, 100, "Login", this, () =>
        {
            this.login()
        })

    }

    async login()
    {
        let user = Moralis.User.current();
        if (!user)
        {
            user = await Moralis.authenticate();
        }
        console.log("logged in user:", user);
    }
}



const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: [MyGame, MainScene]
};


const game = new Phaser.Game(config);

async function login()
{
    let user = Moralis.User.current();
    if (!user)
    {
        user = await Moralis.authenticate();
    }
    console.log("logged in user:", user);
}
async function logOut()
{
    await Moralis.User.logOut();
    console.log("logged out");
}