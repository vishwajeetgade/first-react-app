import React, { Component } from 'react'

export default class AnimeInputForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            img: "",
            skills: [""],
            desc: ""
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeSkill = this.handleChangeSkill.bind(this);
        this.handleAddInput = this.handleAddInput.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.onSave({ ...this.state })
        this.setState({
            name: "",
            img: "",
            skills: [""],
            desc: ""
        })
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleAddInput(e) {
        const { skills } = this.state;
        this.setState({ skills: [...skills, ""] })
    }

    handleChangeSkill(e) {
        const index = Number(e.target.name.split("-")[1]);
        const skills = this.state.skills.map((skill, i) => (
            i === index ? e.target.value : skill
        ))
        this.setState({ skills })
    }

    render() {
        const { name, img, desc, skills } = this.state;
        const skillInputs = skills.map((input, index) => (
            <div className="mb-3" key={`AnimeSkill-${index}`}>
                <label htmlFor={`AnimeSkill-${index}`} className="form-label">{index + 1}.</label>
                <input type="text" className="form-control" size={45} name={`AnimeSkill-${index}`} id={`AnimeSkill-${index}`} value={input} onChange={this.handleChangeSkill} />
            </div>
        ))
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit}>
                    <button className="btn btn-sm btn-primary" type="button" onClick={this.props.onClose}>
                        X
                    </button>
                    <div className="mb-3">
                        <label htmlFor="AnimeName" className="form-label">Name</label>
                        <input type="text" className="form-control" name="name" id="AnimeName" value={name} onChange={this.handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="AnimeImage" className="form-label">Image URL</label>
                        <input type="text" className="form-control" name="img" id="AnimeImg" value={img} onChange={this.handleChange} />
                    </div>
                    {skillInputs}
                    <button className="btn btn-sm btn-primary" type="button" onClick={this.handleAddInput}>
                        +
                    </button>
                    <div className="mb-3">
                        <label htmlFor="AnimeDesc" className="form-label">Description</label>
                        <input type="text" className="form-control" name="desc" id="AnimeDesc" value={desc} onChange={this.handleChange} />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}

AnimeInputForm.defaultProps = {
    onClose() { },
    onSave() { }
}