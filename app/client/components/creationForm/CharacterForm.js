import React from 'react';
import { Link } from 'react-router';
import { Button, FormGroup, ControlLabel, FormControl, Form, HelpBlock, Col, PageHeader, ButtonToolbar, OverlayTrigger, Tooltip} from 'react-bootstrap';
import { browserHistory } from 'react-router';

import Entry from './Entry';

const CharacterForm = React.createClass({
  getInitialState () {
    return {
      statAllocation: this.props.stat,
      skillAllocation: this.props.skill,
      name: this.props.levelUp ? this.props.hero.name : ''
    };
  },

  changeStat(amount) {
  	this.state.statAllocation += amount;
  },

  changeSkill(amount) {
  	this.state.skillAllocation += amount;
  	console.log('this.state.skillAllocation',this.state.skillAllocation)
  },

  handleChange(event) {

    this.setState({name: event.target.value});

  },

  handleClick() {
    this.props.submitCharacter(this.state.name, this.props.submit);
    browserHistory.push('/map');
  },

  allValid() {
    return (this.state.name.length === 0 || this.state.skillAllocation !== 0 || this.state.statAllocation !== 0);
  },

  tooltip() {
    console.log(this.allValid())
    return this.allValid() ? (
    <Tooltip id="tooltip">
      {
        this.state.name.length === 0 ?
        <strong style={{'color':'red'}}>Please enter character name</strong> :
        <strong style={{'color':'red'}}>Please allocate all points</strong>
      }
    </Tooltip>
  ) : (
    <Tooltip id="tooltip">
      <strong style={{'color':'green'}}>All good!</strong>
    </Tooltip>
  )
  },

	render() {
		const {hero, statLowCap, statHighCap, skillLowCap, skillHighCap} = this.props;
		return (
			<Form horizontal className='form formBorder noSelect'>
        <div className='formColumn1'>
          <FormGroup>
  		      <Col smOffset={2} sm={4}>
              <ControlLabel>Character Name</ControlLabel>
            </Col>
  				</FormGroup>
          <FormGroup>
            <Col smOffset={2} sm={2} style={{width: '230px'}}>
              <div className='nameBorder'>
              {
                this.props.levelUp ?
                  <div className='heroName'>{this.state.name}</div>
                :
                  <FormControl
                    type="text"
                    value={this.state.name}
                    onChange={this.handleChange}
                    className='nameInput'
                    style={{border: 'none', 'boxShadow':'none', 'WebkitBoxShadow': 'none', 'outline': 'none' }}/>
              }
              </div>
            </Col>
          </FormGroup>

          <FormGroup className='noSelect'>
          	<Col smOffset={2} sm={1} className='formTitle'>Stats</Col>
          	<Col sm={1} className='inputContainer2'><div className='number'>{this.state.statAllocation}</div></Col>
          </FormGroup>
          <FormGroup>
  	    		{Object.keys(hero.stats).map((k, i) =>
              <Col smOffset={2} key={i}>
    	    			<Entry {...this.props}
        					group='stats'
        					stat={k}
        					updateAllocation={this.changeStat}
        					allocation={this.state.statAllocation}
                  highCap={statHighCap}
                  lowCap={statLowCap}
        					key={i}/>
              </Col>)}
  				</FormGroup>
        </div>

        <div className='formColumn2'>
  				<FormGroup className='noSelect'>
  	        	<Col smOffset={2} sm={1} className='formTitle'>Skills</Col>
  	        	<Col sm={1} className='inputContainer2'><div className='number'>{this.state.skillAllocation}</div></Col>
          </FormGroup>
          <FormGroup>
  				 	{Object.keys(hero.skills).map((k, i) =>
              <Col smOffset={2} key={i}>
    				 		<Entry {...this.props}
    				 		  group='skills'
    				 		  stat={k}
    				 		  updateAllocation={this.changeSkill}
    				 		  allocation={this.state.skillAllocation}
                  highCap={skillHighCap}
                  lowCap={skillLowCap}
    				 		  key={i}/>
              </Col>)}
  				</FormGroup>

  				<FormGroup>
            <Col smOffset={7}>
              <OverlayTrigger placement="left" trigger={['hover', 'focus']} overlay={this.tooltip()}>
                <div style={{display: 'inline-block', cursor: 'not-allowed'}} className='createButton'>
                  <Button bsStyle={{opacity: '0'}} style={this.allValid() ? {pointerEvents : 'none'} : {}} disabled={this.allValid()} onClick={this.handleClick} className='hiddenButton'>
                      Continue
                  </Button>
                </div>
              </OverlayTrigger>
            </Col>
  		    </FormGroup>
        </div>

		  </Form>
		)
	}
});

export default CharacterForm;
