import React, { Component } from 'react';
import './RandomRemove.css';
import PropTypes from 'prop-types'

const InstructorItem = props => {
    return (
        <li key={props.index}>
            <h3>{props.Instructor.name}</h3>
            <h4>Hobbies: {props.Instructor.hobbies.join(", ")}</h4>
        </li>
    )
}

InstructorItem.propTypes = {
    instructor: PropTypes.exact({
      name:PropTypes.string,
      hobbies:PropTypes.arrayOf(PropTypes.string)  
    })
}


class RandomRemove extends Component {
    constructor(props){
        super(props);
        this.state = {
            instructors: [
                {
                    name:"Nico Robin",
                    hobbies:["reading", "Writing"]
                },
                {
                    name:"Sakura Haruno",
                    hobbies:["medicine", "Useless"]
                },
                {
                    name:"Tsunade Senju",
                    hobbies:["Driking", "Gambling"]
                },
                {
                    name:"Hinata Hyuga",
                    hobbies:["Cooking", "Training"]
                }   
            ]
        }

        setTimeout(()=>{
           const randomInstIndex = Math.floor(Math.random()* this.state.instructors.length);
           const randomHobbiesIndex = Math.floor(Math.random()* this.state.instructors[randomInstIndex].hobbies.length);
            
           //Using Object.assign
            // const newInstructors = this.state.instructors.slice();
            // newInstructors[randomInstIndex] = Object.assign({}, newInstructors[randomInstIndex]);
            // newInstructors[randomInstIndex].hobbies = newInstructors[randomInstIndex].hobbies.slice();
            // newInstructors[randomInstIndex].hobbies.splice(randomHobbiesIndex,1);
            // this.setState({instructors:newInstructors});

            //Using Spread operator 
            const instructors = this.state.instructors.map((inst , i) =>{
                if(i===randomInstIndex){
                    const hobbies = inst.hobbies.slice();
                    hobbies.splice(randomHobbiesIndex,1);
                    return {
                        ...inst,
                        hobbies
                    }
                }
                return inst;
            })
            this.setState({instructors});

        },5000);

    }
    render() {
        let instructors = this.state.instructors.map((instructor, index) =>(
            <InstructorItem Instructor={instructor} key={index} />
        ))
        return (
            <div className="RandomRemove py-4">
                <ul>
                    {instructors}
                </ul>
            </div>
        )
    }
}

export default RandomRemove;
