import React from 'react'
import {isEmpty} from 'lodash'
import {fetchOptionsOverride} from "../../../shared/fetchOverrideOptions"
import {addPrimarySchoolRecord, students} from "../../../shared/queries"
import Select from 'react-select'
import {Query} from 'graphql-react'
import TextFieldGroup from "../../shared/TextFieldsGroup"

let marksOptions = () => {
    let marks = []
    for (let i = 0; i <= 100; i++) {
        marks.push({
            label: i,
            value: i
        })
    }
    return marks
}
let upiOptions

class KCPE extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            upi: '',
            math: '',
            english: '',
            kiswahili: '',
            science: '',
            social_studies: '',
            year:'',
            message: ''
        }

        this.onChangeMath=this.onChangeMath.bind(this)
        this.onChangeScience=this.onChangeScience.bind(this)
        this.onChangeKiswahili=this.onChangeKiswahili.bind(this)
        this.onChangeEnglish=this.onChangeEnglish.bind(this)
        this.onChangeSocialStudies=this.onChangeSocialStudies.bind(this)
        this.onChangeUpi=this.onChangeUpi.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)

    }


    onSubmit(e) {
        e.preventDefault()
        // if (this.isValid()) {
            this.setState({errors: {}, isLoading: true})
            this.props.graphql
                .query({
                    fetchOptionsOverride: fetchOptionsOverride,
                    resetOnLoad: true,
                    operation: {
                        variables: {
                            upi: this.state.upi.value,
                            math: this.state.math.value,
                            english: this.state.english.value,
                            kiswahili: this.state.kiswahili.value,
                            science: this.state.science.value,
                            social_studies: this.state.social_studies.value,
                            year: this.state.year,
                        },
                        query: addPrimarySchoolRecord
                    }
                })
                .request.then(({data}) => {
                    if (data) {
                        this.setState({
                            upi: '',
                            math: '',
                            english: '',
                            kiswahili: '',
                            chemistry: '',
                            science: '',
                            social_studies: '',
                            year:'',
                            message: data
                                ? `New KCPE record added.`
                                : `An error occurred while adding record.`
                        })
                    }
                }
            )
        // }
    }

    onChangeMath(math) {
        this.setState({math})
    }

    onChangeScience(science) {
        this.setState({science})
    }

    onChangeKiswahili(kiswahili) {
        this.setState({kiswahili})
    }

    onChangeEnglish(english) {
        this.setState({english})
    }

    onChangeSocialStudies(social_studies) {
        this.setState({social_studies})
    }
    onChangeUpi(upi) {
        this.setState({upi})

    }
    onChange(e) {
        this.setState({[e.target.name]:e.target.value})

    }

    render() {
        const {loading, message} = this.state
        if (loading) {
            return <p>Adding record…</p>
        }
        if (message) {
            return <div className="alert alert-info">{message}</div>
        }
        return (
            <form onSubmit={this.onSubmit}>
                <Query
                    loadOnMount
                    loadOnReset
                    fetchOptionsOverride={fetchOptionsOverride}
                    variables={{education: 'primary'}}
                    query={students}
                >
                    {({loading, data}) => {
                        if (data) {
                            upiOptions = data.students.map(student => {
                                return {
                                    label: student.upi,
                                    value: student.upi
                                }
                            })
                            return <div className="form-group row">
                                <label className="col-sm-3 col-form-label">Student UPI</label>
                                <div className="col-sm-9 "><Select
                                    closeOnSelect={true}
                                    onChange={this.onChangeUpi}
                                    options={upiOptions}
                                    placeholder="Search Student UPI"
                                    removeSelected={true}
                                    value={this.state.upi}
                                />
                                </div>
                            </div>
                        }
                        else if (loading) {
                            return <p>Loading…</p>
                        }
                        return <p>Loading failed.</p>
                    }
                    }
                </Query>
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Math</label>
                    <div className="col-sm-9 ">
                        <Select
                            closeOnSelect={true}
                            onChange={this.onChangeMath}
                            options={marksOptions()}
                            placeholder="Search Score"
                            removeSelected={true}
                            value={this.state.math}
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label">English</label>
                    <div className="col-sm-9 ">
                        <Select
                            closeOnSelect={true}
                            onChange={this.onChangeEnglish}
                            options={marksOptions()}
                            placeholder="Search Score"
                            removeSelected={true}
                            value={this.state.english}
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Kiswahili</label>
                    <div className="col-sm-9 ">
                        <Select
                            closeOnSelect={true}
                            onChange={this.onChangeKiswahili}
                            options={marksOptions()}
                            placeholder="Search Score"
                            removeSelected={true}
                            value={this.state.kiswahili}
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Science</label>
                    <div className="col-sm-9 ">
                        <Select
                            closeOnSelect={true}
                            onChange={this.onChangeScience}
                            options={marksOptions()}
                            placeholder="Search Score"
                            removeSelected={true}
                            value={this.state.science}
                        />
                    </div>
                </div>

                <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Social studies & Religion</label>
                    <div className="col-sm-9 ">
                        <Select
                            closeOnSelect={true}
                            onChange={this.onChangeSocialStudies}
                            options={marksOptions()}
                            placeholder="Search Score"
                            removeSelected={true}
                            value={this.state.social_studies}
                        />
                    </div>
                </div>
                <TextFieldGroup
                    label="Date"
                    type="date"
                    name="year"
                    value={this.state.year}
                    onChange={this.onChange}

                />
                <div className="form-group row">
                    <div className="col-sm-9 offset-3">
                        <button
                                className="btn btn-dark btn-sm form-control "
                                type="submit">Save
                        </button>
                    </div>
                </div>
            </form>
        )
    }
}

export default KCPE