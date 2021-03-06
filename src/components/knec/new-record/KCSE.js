import React from 'react'
import {isEmpty} from 'lodash'
import {fetchOptionsOverride} from "../../../shared/fetchOverrideOptions"
import {addSecondarySchoolRecord, students} from "../../../shared/queries"
import Select from 'react-select'
import {Query} from 'graphql-react'
import TextFieldGroup from "../../shared/TextFieldsGroup"
import getWeb3 from "../../../utils/getWeb3"
import PublicRecords from "../../../blockchain/build/contracts/PublicRecords"

const contract = require('truffle-contract')
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
let yearOptions = () => {
    let marks = []
    for (let i = 1987; i <= 2017; i++) {
        marks.push({
            label: i,
            value: i
        })
    }
    return marks
}
let upiOptions = [{
    label: "ABC",
    value: "ABC"
}, {
    label: "BDD",
    value: "BDD"
}, {
    label: "JKI",
    value: "JKI"
}, {
    label: "ZXY",
    value: "ZXY"
}, {
    label: "WFY",
    value: "WFY"
}]
let schoolUpiOptions = [{
    label: "SOL",
    value: "SOL"
}, {
    label: "DHY",
    value: "DHY"
}, {
    label: "FKJ",
    value: "FKJ"
}, {
    label: "WXC",
    value: "WXC"
}, {
    label: "ASD",
    value: "ASD"
}]
class KCSE extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            upi: '',
            math: 0,
            english: 0,
            kiswahili: 0,
            chemistry: 0,
            biology: 0,
            physics: 0,
            geography: 0,
            history: 0,
            religion: 0,
            business: 0,
            year:'',
            message: '',
            institution:''
        }
        this.onChangeMath=this.onChangeMath.bind(this)
        this.onChangeChemistry=this.onChangeChemistry.bind(this)
        this.onChangeBiology=this.onChangeBiology.bind(this)
        this.onChangeKiswahili=this.onChangeKiswahili.bind(this)
        this.onChangeEnglish=this.onChangeEnglish.bind(this)
        this.onChangePhysics=this.onChangePhysics.bind(this)
        this.onChangeGeography=this.onChangeGeography.bind(this)
        this.onChangeHistory=this.onChangeHistory.bind(this)
        this.onChangeReligion=this.onChangeReligion.bind(this)
        this.onChangeBusiness=this.onChangeBusiness.bind(this)
        this.onChangeUpi=this.onChangeUpi.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
        this.onChangeYear = this.onChangeYear.bind(this)
        this.onChangeSchoolUpi = this.onChangeSchoolUpi.bind(this)

    }

    onChangeYear(year) {
        this.setState({year})
    }

    onChangeSchoolUpi(institution) {
        this.setState({institution})
    }
    componentWillMount() {
        // Get network provider and web3 instance.
        getWeb3
            .then(results => {
                this.setState({
                    web3: results.web3
                })
            })
            .catch(() => {
                console.log('Error finding web3.')
            })
    }


    onSubmit(e) {

        e.preventDefault()
        const publicRecords = contract(PublicRecords)
        publicRecords.setProvider(this.state.web3.currentProvider)

        // Declaring this for later so we can chain functions on SimpleStorage.
        let publicRecordsInstance
        // Get accounts.
        this.state.web3.eth.getCoinbase((error, coinbase) => {
            publicRecords.deployed().then((instance) => {
                publicRecordsInstance = instance
                console.log(this.state)
                return publicRecordsInstance.addSecondarySchoolRecord(this.state.upi.value, this.state.english.value, this.state.kiswahili.value, this.state.math.value,this.state.biology.value,this.state.chemistry.value,this.state.physics.value,this.state.history.value,this.state.geography.value,this.state.religion.value,this.state.business.value,this.state.year.value,this.state.institution.value,{from: coinbase})
            }).then((result) => {
            this.setState({errors: {}, isLoading: true})
            this.setState({  message: 'New KCSE record added.'})
            })
        })
            // this.props.graphql
            //     .query({
            //         fetchOptionsOverride: fetchOptionsOverride,
            //         resetOnLoad: true,
            //         operation: {
            //             variables: {
            //                 upi: this.state.upi.value,
            //                 math: this.state.math.value,
            //                 english: this.state.english.value,
            //                 kiswahili: this.state.kiswahili.value,
            //                 chemistry: this.state.chemistry.value,
            //                 physics: this.state.physics.value,
            //                 biology: this.state.biology.value,
            //                 geography: this.state.geography.value,
            //                 religion: this.state.religion.value,
            //                 history: this.state.history.value,
            //                 business: this.state.business.value,
            //                 year: this.state.year,
            //             },
            //             query: addSecondarySchoolRecord
            //         }
            //     })
            //     .request.then(({data}) => {
            //         if (data) {
            //             this.setState({
        // upi:''
            //                 math: 0,
            //                 english: 0,
            //                 kiswahili: 0,
            //                 chemistry: 0,
            //                 biology: 0,
            //                 physics: 0,
            //                 geography: 0,
            //                 history: 0,
            //                 religion: 0,
            //                 business: 0,
            //                 year:0,
            //                 message: data
            //                     ? `New KCSE record added.`
            //                     : `An error occurred while adding record.`
            //             })
            //         }
            //     }
            // )
    }


    onChangeMath(math) {
        this.setState({math})
    }
    onChangeChemistry(chemistry) {
        this.setState({chemistry})
    }

    onChangeBiology(biology) {
        this.setState({biology})
    }

    onChangeKiswahili(kiswahili) {
        this.setState({kiswahili})
    }
    onChangeEnglish(english) {
        this.setState({english})
    }
    onChangePhysics(physics) {
        this.setState({physics})
    }
    onChangeGeography(geography) {
        this.setState({geography})
    }
    onChangeHistory(history) {
        this.setState({history})
    }
    onChangeReligion(religion) {
        this.setState({religion})

    }
    onChangeBusiness(business) {
        this.setState({business})

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
            return <p>Adding KCSE Record…</p>
        }
        if (message) {
            return <div className="alert alert-info">{message}</div>
        }
        return (
            <form onSubmit={this.onSubmit}>
                {message ? <div className="alert alert-info">{message}</div> : ''}
                {/*<Query*/}
                    {/*loadOnMount*/}
                    {/*loadOnReset*/}
                    {/*fetchOptionsOverride={fetchOptionsOverride}*/}
                    {/*variables={{education:'secondary'}}*/}
                    {/*query={students}*/}
                {/*>*/}
                    {/*{({loading, data}) => {*/}
                        {/*if (data) {*/}
                            {/*upiOptions = data.students.map(student => {*/}
                                {/*return {*/}
                                    {/*label: student.upi,*/}
                                    {/*value: student.upi*/}
                                {/*}*/}
                            {/*})*/}
                            {/*return  <div className="form-group row">*/}
                                {/*<label className="col-sm-3 col-form-label">Student UPI</label>*/}
                                {/*<div className="col-sm-9 "><Select*/}
                                {/*closeOnSelect={true}*/}
                                {/*onChange={this.onChangeUpi}*/}
                                {/*options={upiOptions}*/}
                                {/*placeholder="Search Student UPI"*/}
                                {/*removeSelected={true}*/}
                                {/*value={this.state.upi}*/}

                            {/*/>*/}
                                {/*</div>*/}
                            {/*</div>*/}
                        {/*}*/}
                        {/*else if (loading) {*/}
                            {/*return <p>Loading…</p>*/}
                        {/*}*/}
                        {/*return <p>Loading failed.</p>*/}
                    {/*}*/}
                    {/*}*/}
                {/*</Query>*/}
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Student UPI</label>
                    <div className="col-sm-9 ">
                        <Select
                            closeOnSelect={true}
                            onChange={this.onChangeUpi}
                            options={upiOptions}
                            placeholder="Search Upi"
                            removeSelected={true}
                            value={this.state.upi}
                        />
                    </div>
                </div>
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
                    <label className="col-sm-3 col-form-label">Chemistry</label>
                    <div className="col-sm-9 ">
                        <Select
                            closeOnSelect={true}
                            onChange={this.onChangeChemistry}
                            options={marksOptions()}
                            placeholder="Search Score"
                            removeSelected={true}
                            value={this.state.chemistry}

                        />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Biology</label>
                    <div className="col-sm-9 ">
                        <Select
                            closeOnSelect={true}
                            onChange={this.onChangeBiology}
                            options={marksOptions()}
                            placeholder="Search Score"
                            removeSelected={true}
                            value={this.state.biology}

                        />
                    </div>

                </div>
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Physics</label>
                    <div className="col-sm-9 ">
                        <Select
                            closeOnSelect={true}
                            onChange={this.onChangePhysics}
                            options={marksOptions()}
                            placeholder="Search Score"
                            removeSelected={true}
                            value={this.state.physics}

                        />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Geography</label>
                    <div className="col-sm-9 ">
                        <Select
                            closeOnSelect={true}
                            onChange={this.onChangeGeography}
                            options={marksOptions()}
                            placeholder="Search Score"
                            removeSelected={true}
                            value={this.state.geography}

                        />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label">History</label>
                    <div className="col-sm-9 ">
                        <Select
                            closeOnSelect={true}
                            onChange={this.onChangeHistory}
                            options={marksOptions()}
                            placeholder="Search Score"
                            removeSelected={true}
                            value={this.state.history}

                        />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Religion</label>
                    <div className="col-sm-9 ">
                        <Select
                            closeOnSelect={true}
                            onChange={this.onChangeReligion}
                            options={marksOptions()}
                            placeholder="Search Score"
                            removeSelected={true}
                            value={this.state.religion}

                        />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Business</label>
                    <div className="col-sm-9 ">
                        <Select
                            closeOnSelect={true}
                            onChange={this.onChangeBusiness}
                            options={marksOptions()}
                            placeholder="Search Score"
                            removeSelected={true}
                            value={this.state.business}

                        />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Year</label>
                    <div className="col-sm-9 ">
                        <Select
                            closeOnSelect={true}
                            onChange={this.onChangeYear}
                            options={yearOptions()}
                            placeholder="Search Year"
                            removeSelected={true}
                            value={this.state.year}
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Institution UPI</label>
                    <div className="col-sm-9 ">
                        <Select
                            closeOnSelect={true}
                            onChange={this.onChangeSchoolUpi}
                            options={schoolUpiOptions}
                            placeholder="Search UPI"
                            removeSelected={true}
                            value={this.state.institution}
                        />
                    </div>
                </div>

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

export default KCSE