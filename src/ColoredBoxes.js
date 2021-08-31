import React, { Component } from 'react'
const ARR_SIZE = 28;

const Boxes = props =>{
    const style = {
        width:"180px",
        height: "180px",
        display:"inline-block",
        backgroundColor: props.color
    }
    return(
        <div style={style} ></div>
    );
}

export default class ColoredBoxes extends Component {
    constructor(props){
        super(props);
        const Boxes = Array(ARR_SIZE).fill().map(this.getRandomColor, this);
        this.state={Boxes};

        setInterval(()=>{
            const Boxes = this.state.Boxes.slice();
            const randomIndex = Math.floor(Math.random()*this.state.Boxes.length);
            Boxes[randomIndex] = this.getRandomColor();
            this.setState({Boxes});
        },200);
    }

    getRandomColor(){
        return this.props.allColors[Math.floor(Math.random()*this.props.allColors.length)];
    }

    render() {
        let coloredBoxes = this.state.Boxes.map((color, index)=>(
            <Boxes color={color} key={index}/>
        ))
        return (
            <div className="px-4">
                {coloredBoxes}
            </div>
        )
    }
}

ColoredBoxes.defaultProps = {
    allColors: ["AliceBlue","AntiqueWhite","Aqua","Aquamarine","Azure","Beige","Bisque","Black","BlanchedAlmond",
    "Blue","BlueViolet","Brown","BurlyWood","CadetBlue","Chartreuse","Chocolate",
    "Coral","CornflowerBlue","Cornsilk","Crimson","Cyan","DarkBlue","DarkCyan","DarkGoldenRod",
    "DarkGray","DarkGrey","DarkGreen","DarkKhaki","DarkMagenta","DarkOliveGreen","Darkorange",
    "DarkOrchid","DarkRed","DarkSalmon","DarkSeaGreen","DarkSlateBlue","DarkSlateGray","DarkSlateGrey",
    "DarkTurquoise","DarkViolet","DeepPink","DeepSkyBlue","DimGray","DimGrey","DodgerBlue",
    "FireBrick","FloralWhite","ForestGreen","Fuchsia","Gainsboro","GhostWhite","Gold","GoldenRod",
    "Gray","Grey","Green","GreenYellow","HoneyDew","HotPink","IndianRed","Indigo","Ivory","Khaki",
    "Lavender","LavenderBlush","LawnGreen","LemonChiffon","LightBlue","LightCoral","LightCyan",
    "LightGoldenRodYellow","LightGray","LightGrey","LightGreen","LightPink","LightSalmon",
    "LightSeaGreen","LightSkyBlue","LightSlateGray","LightSlateGrey","LightSteelBlue","LightYellow",
    "Lime","LimeGreen","Linen","Magenta","Maroon","MediumAquaMarine","MediumBlue","MediumOrchid",
    "MediumPurple","MediumSeaGreen","MediumSlateBlue","MediumSpringGreen","MediumTurquoise",
    "MediumVioletRed","MidnightBlue","MintCream","MistyRose","Moccasin","NavajoWhite","Navy",
    "OldLace","Olive","OliveDrab","Orange","OrangeRed","Orchid","PaleGoldenRod","PaleGreen",
    "PaleTurquoise","PaleVioletRed","PapayaWhip","PeachPuff","Peru","Pink","Plum","PowderBlue",
    "Purple","Red","RosyBrown","RoyalBlue","SaddleBrown","Salmon","SandyBrown","SeaGreen",
    "SeaShell","Sienna","Silver","SkyBlue","SlateBlue","SlateGray","SlateGrey","Snow","SpringGreen",
    "SteelBlue","Tan","Teal","Thistle","Tomato","Turquoise","Violet","Wheat","White","WhiteSmoke",
    "Yellow","YellowGreen"]
}
