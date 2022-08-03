export class Palette {
    name;
    colors;

    constructor(name, colors) {
        this.name = name;
        this.colors = colors;
    }
}

export class PaletteService {

    palettes = [
        new Palette(
            "bright 1",
            [
                "#66C5CC",
                "#F6CF71",
                "#F89C74",
                "#DCB0F2",
                "#87C55F",
                "#9EB9F3",
                "#FE88B1",
                "#C9DB74",
                "#8BE0A4",
                "#B497E7",
                "#D3B484",
                "#B3B3B3"
            ]
        ),
        new Palette(
            "bright 2",
            [
                "#FFCBF2",
                "#F3C4FB",
                "#ECBCFD",
                "#E5B3FE",
                "#E2AFFF",
                "#DEAAFF",
                "#D8BBFF",
                "#D0D1FF",
                "#C8E7FF",
                "#C0FDFF",
            ]
        ),
        // https://coolors.co/palette/fbf8cc-fde4cf-ffcfd2-f1c0e8-cfbaf0-a3c4f3-90dbf4-8eecf5-98f5e1-b9fbc0
        new Palette(
            "bright 3",
            [
                "#FBF8CC",
                "#FDE4CF",
                "#FFCFD2",
                "#F1C0E8",
                "#CFBAF0",
                "#A3C4F3",
                "#90DBF4",
                "#8EECF5",
                "#98F5E1",
                "#B9FBC0",
            ]
        ),
    ];
}
