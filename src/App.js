import React, { Component } from 'react';
import './App.css';

import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { withStyles } from '@material-ui/core/styles';

import yamlConverter from 'js-yaml';

import { Stage, Layer, Rect, Text, Image } from 'react-konva';
import Konva from 'konva';
import useImage from 'use-image';

const LionImage = () => {
  const [image] = useImage('https://i.imgur.com/jUOj2YX.png');
  return <Image image={image} />;
};

class ColoredRect extends React.Component {
  state = {
    color: 'green'
  };
  handleClick = () => {
    this.setState({
      color: Konva.Util.getRandomColor()
    });
  };
  render() {
    return (
      <Rect
        x={20}
        y={20}
        width={50}
        height={50}
        fill={this.state.color}
        shadowBlur={5}
        onClick={this.handleClick}
      />
    );
  }
}

const width = 600
const height = 710

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  textField:{
    width: '50%',
    marginRight: 16
  },
  fontSize:{
    width: '10%'
  }
});

class App extends Component {
  state = {
    inputs: [
      {key: 'top', value: '', color: '#ff0000', x: 50, y: 50, fontSize: 48},
      {key: 'bottom', value: '', color: '#00ff00', x: 50, y: 220, fontSize: 48},
    ],
    template: '',
    labelWidth: 0,
  }
  componentDidMount() {
    // const canvas = this.refs.canvas
    // const ctx = canvas.getContext("2d")
    // const img = this.refs.image
    // img.onload = () => {
    //   ctx.drawImage(img, 0, 0)
    // }
    const yamlString = `
size: 600x710
background:
  image: https://i.imgur.com/jUOj2YX.png
  position:
    x: 0
    y: 0
    z: 0
top text:
  text: top text
  upper: true
  style:
    textTransform: uppercase
    textAlign: center
    font: bold 60px Impact
    color: white
  stroke:
    width: 5
    color: black
  position:
    x: 300
    y: 80
bottom text:
  text: bottom text
  style:
    textTransform: uppercase
    textAlign: center
    font: bold 60px Impact
    color: white
    stroke:
      width: 5
      color: black
  position:
    x: 300
    y: 690    
    `
    const doc = yamlConverter.safeLoad(yamlString)
  }

  handleChangeTemplate = event => {
    this.setState({ template: event.target.value });
  };

  handleSubmit = () => {
    console.log('submit')
  }

  handleTextFieldChange = key => event => {
    const { inputs } = this.state
    const oldInputs = inputs
    const newInputs = oldInputs.map( input => {
      const { key: inputKey } = input
      if(key === inputKey) {
        input.value = event.target.value
      }
      return input
    })
    this.setState({ inputs: newInputs });
  }

  handleFontSizeChange = key => event => {
    const { inputs } = this.state
    const oldInputs = inputs
    const newInputs = oldInputs.map( input => {
      const { key: inputKey } = input
      if(key === inputKey) {
        input.fontSize = event.target.value
      }
      return input
    })
    this.setState({ inputs: newInputs });
  }

  handleColorChange = key => event => {
    const { inputs } = this.state
    const oldInputs = inputs
    const newInputs = oldInputs.map( input => {
      const { key: inputKey } = input
      if(key === inputKey) {
        input.color = event.target.value
      }
      return input
    })
    this.setState({ inputs: newInputs });
  }

  handleOnDragEnd = key => event =>{
    const { inputs } = this.state
    const oldInputs = inputs
    const newInputs = oldInputs.map( input => {
      const { key: inputKey } = input
      if(key === inputKey) {
        input.x = event.target.x()
        input.y = event.target.y()
      }
      console.log(event.target.y())
      return input
    })
    this.setState({ inputs: newInputs });
  }

  render() {
    const { inputs, template } = this.state
    const { classes } = this.props;

    return (
      <div className="App">
        <header className="App-header" variant="outlined">
          <div className="image-container">
            <Stage ref="stage" width={width} height={height} style={{position: 'relative', overflow: 'hidden'}}>
              <Layer>
                <LionImage></LionImage>
                {inputs.map( ({key, value, color, x, y, fontSize}) => {
                  return (<Text
                    text={`${value}`}
                    x={x}
                    y={y}
                    fontSize={fontSize}
                    draggable
                    fill={color}
                    width={width-16}
                    onDragEnd={this.handleOnDragEnd(key)}
                    wrap
                    key={key}
                  />)
                })
                }
              </Layer>
            </Stage>
            <img ref="image" src={'https://i.imgur.com/jUOj2YX.png'} className="App-logo" alt="logo" />
          </div>
          <div className="input-container">
            <div className="input-border">
              {inputs.map( ({ key, value, color, fontSize }) => (
                  <div className="row-container" key={key}>
                    <div className="input-title">
                      {key}
                    </div>
                    <TextField
                      className={classes.textField}
                      id={key + value}
                      value={value}
                      margin="normal"
                      variant="outlined"
                      onChange={this.handleTextFieldChange(key)}
                    />
                    <input type="color" id={key + color} value={color} onChange={this.handleColorChange(key)}></input>
                    <TextField
                      className={classes.fontSize}
                      id={key + fontSize}
                      value={fontSize}
                      margin="normal"
                      variant="outlined"
                      onChange={this.handleFontSizeChange(key)}
                    />
                  </div>
                ))
              }
            </div>
            <Button variant="contained" color="primary" onClick={()=>{
              const node = this.refs.stage
              const dataURL = node.toDataURL()
              const link = document.createElement('a');
              link.download = 'name.jpg';
              link.href = dataURL;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}>
              Export
            </Button>
          </div>
        </header>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel
            ref={ref => {
              this.InputLabelRef = ref;
            }}
            htmlFor="outlined-age-simple"
          >
            Template
          </InputLabel>
          <Select
            value={template}
            onChange={this.handleChangeTemplate}
            input={
              <OutlinedInput
                labelWidth={this.state.labelWidth}
                name="template"
                id="outlined-age-simple"
              />
            }
          >
            <MenuItem value={10}>Bad Luck Brian</MenuItem>
            <MenuItem value={20}>One Does Not Simply</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </div>
    );
  }
}

export default withStyles(styles)(App);
