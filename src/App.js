import React from 'react';
import './App.css';

export default class App extends React.Component {
  state = {
    
    cocktails: [
      {
        type: 'alcho',
        name: 'Cuba Libre',
        ingredients: ['rum', 'cola', 'lime']
      },
      {
        type: 'alcho',
        name: 'Blood Mary',
        ingredients: ['vodka', 'tomato juice']
      },
      {
        type: 'non-alcho',
        name: 'Mojito',
        ingredients: ['lime', 'sprite', 'mint']
      },
      {
        type: 'alcho',
        name: 'Margarita',
        ingredients: ['tequilla', 'lime', 'liquor']
      }
    ],


    alchoIngredients: ['', 'vodka', 'rum', 'tequilla', 'whiskey', 'cola', 'grenadin', 'ice', 'lime', 'tomato juice', 'liquor'],
    nonAlchoIngredients: ['', 'cola', 'grenadin', 'tomato juice', 'lime', 'sprite', 'ice', 'mint'],
    choose1: false,
    choose2: false,
    numOfIngredients: '',
    newCocktail: ''
  }

  selectAlcho = () => {
    let choose = this.state.choose1
    this.setState({
      choose1: !choose,
      choose2: false,
      newCocktail: []
    })
  }

  selectNonAlcho = () => {
    let choose = this.state.choose2
    this.setState({
      choose2: !choose,
      choose1: false,
      newCocktail: []
    })
  }

  newCocktail = (ingredient, key) => {
    const cocktails = [...this.state.newCocktail];
    cocktails[key] = ingredient;

    console.log(cocktails);
    this.setState({
      newCocktail: cocktails
    });
  }

  renderAlcho = () => {
    const selects = [];
    if (this.state.choose1 === true) {
      for (let i = 0; i < this.state.numOfIngredients; i++) {
        selects.push(<select key={i} onChange={e => this.newCocktail(e.target.value, i)} >{
          this.state.alchoIngredients.map((item, index) => (
            <option key={index}>{item}</option>
          ))
        }</select>);
      }
    }
    return selects;
  }

  renderNonAlcho = () => {
    const selects = [];
    if (this.state.choose2 === true) {
      for (let i = 0; i < this.state.numOfIngredients; i++) {
        selects.push(<select key={i} onChange={e => this.newCocktail(e.target.value, i)}>{
          this.state.nonAlchoIngredients.map((item, index) => (
            <option key={index}>{item}</option>
          ))
        }</select>); 
      }
    }
    return selects;
  }

  mix = () => {
    
    const cocktail = this.state.cocktails.map((cocktail) => ({
      name: cocktail.name,
      isReady: cocktail.ingredients.every((ingredient) =>
      this.state.newCocktail.includes(ingredient))
    })).find((cocktail) => cocktail.isReady);

    if(!cocktail) {
      return alert("It's not possible to mix the cocktail")
    }

    return alert(`You've mixed the ${cocktail.name} cocktail`);
  }


  render() {

    return(
      <>
        <div className="wrapper">
          <div onClick={this.selectAlcho} className={this.state.choose1.toString()}>Alcho</div>
          <div onClick={this.selectNonAlcho} className={this.state.choose2.toString()}>Non-alcho</div>
        </div>
        <div className="ingredients-count">
          <span>Select the amount of ingredients:</span>
          <select onChange={e => this.setState({numOfIngredients: e.target.value})}>
            <option value="0"></option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
          </select>
        </div>
       
       <div className="wrapper-selects">
        {this.renderAlcho()}
        {this.renderNonAlcho()}
       </div>
       <button onClick={this.mix}>Mix cocktail</button>
       
      </>
     
    )
  }
}