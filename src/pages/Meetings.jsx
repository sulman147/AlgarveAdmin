import React, { useEffect, useState } from 'react'
import api from "../api/meeting2"
import Table from '../components/table/Table'
import CircularProgress from '@material-ui/core/CircularProgress';

const customerTableHead = [
    'SNo',
    'Title',
    'Ref',
    'Secgrade',
    'Place',
    'Chaired By',
    'Time'
]

const renderHead = (item, index) => <th key={index}>{item}</th>

const renderBody = (item, index) => (
    <tr key={index}>
        <td>{index + 1}</td>
        <td>{item.meetingTitle}</td>
        <td>{item.meetingRef}</td>
        <td>{item.meetingSecgrade}</td>
        <td>{item.meetingPlace}</td>
        <td>{item.meetingChairedby}</td>
        <td>{item.meetingTime}</td>
    </tr>
)

const Meetings = () => {

    const [meetings, setMeetings] = useState(null)
    const getAllMeetings = async () => {
        const response = await api.get("./meeting");
        return response.data;
    };
    const getMeeting = async () => {
        const allMeeting = await getAllMeetings();

        if (allMeeting) setMeetings(allMeeting);
    };
    useEffect(() => {
        console.log("use effect start")
        getMeeting()
        console.log("use effect Close")
    }, []);


    return (
        <>
            {(!meetings) ? <CircularProgress /> :
                <div>
                    <h2 className="page-header">
                        All Meetings
                    </h2>
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card__body">
                                    <Table
                                        limit='20'
                                        headData={customerTableHead}
                                        renderHead={(item, index) => renderHead(item, index)}
                                        bodyData={meetings}

                                        renderBody={(item, index) => renderBody(item, index)}
                                    />
                                    {console.log("this is meeing data", meetings)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>}

        </>
    )
}

export default Meetings


