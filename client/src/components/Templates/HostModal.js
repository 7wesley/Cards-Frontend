import React, {useState} from 'react';

import { db, timestamp } from '../../firebase';
import { Modal, Button, Form } from 'react-bootstrap';


const HostModal = ({closeModal, setRoom, id}) => {

    const [game, setGame] = useState('');
    //const [id, setId] = useSessionStorage('id');

    const handleSubmit = async (e) => {
        e.preventDefault()
        let roomRef = db.collection('rooms').doc();
        await roomRef.set({
            game,
            players: {},
            size: 0,
            maxPlayers: e.target[3].value,
            gameId: roomRef.id,
            host: id,
            createdAt: timestamp()
        })
        setRoom(roomRef.id)
        closeModal();
    }

    const handleChange = () => {

    }

    return (
        <>
            <Modal.Header closeButton={closeModal}>Host game</Modal.Header>
            <Form onChange = { handleChange } onSubmit = { handleSubmit }>
                <Modal.Body>
                    <h2>Customizations</h2>   
                    <div onChange={e => setGame(e.target.value)}>
                        <div className="custom-control custom-radio custom-control-inline">
                            <input type="radio" id="customRadio1" name="customRadio" className="custom-control-input" value = "Blackjack" required/>
                            <label className="custom-control-label" htmlFor="customRadio1">Blackjack</label>
                        </div>
                        <div className="custom-control custom-radio custom-control-inline">
                            <input type="radio" id="customRadio2" name="customRadio" className="custom-control-input" value = "Poker"/>
                            <label className="custom-control-label" htmlFor="customRadio2">Poker</label>
                        </div>
                        <div className="custom-control custom-radio custom-control-inline">
                            <input type="radio" id="customRadio3" name="customRadio" className="custom-control-input" value = "War"/>
                            <label className="custom-control-label" htmlFor="customRadio3">War</label>
                        </div>
                    </div>
                    <div className="form-group mt-3">
                        <label className="mr-3" htmlFor="quantity">Number of Players (2 to 8)</label>
                        <input placeholder = "2" type="number" id="quantity" name="quantity" min="2" max="8" required/>
                    </div>
                    <div className="custom-control custom-checkbox my-1 mr-sm-2">
                        <input type="checkbox" className="custom-control-input" id="customControlInline"/>
                        <label className="custom-control-label" htmlFor="customControlInline">Computer players?</label>
                    </div>
                </Modal.Body>          
                <Modal.Footer>
                    <Button onClick = {closeModal}>Close</Button>
                    <Button type="submit">Submit</Button>
                </Modal.Footer>  
            </Form>
        </>               
    )
}

export default HostModal;