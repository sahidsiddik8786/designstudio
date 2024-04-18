import React from 'react';
import { Card } from 'react-bootstrap';

const UserCard = ({ user }) => {

    
    return (
            <Card.Body   >
                <Card.Title>{user.firstname} {user.lastname}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{user.email}</Card.Subtitle>
    
            </Card.Body>
   
    );
};

export default UserCard;
