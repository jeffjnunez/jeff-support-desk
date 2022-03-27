import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { getTicket, closeTicket, reset } from '../features/tickets/ticketSlice';
import { getNotes, reset as notesReset } from '../features/notes/noteSlice';
import NoteItem from '../components/NoteItem';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const Ticket = () => {
    const {
        ticket,
        isError,
        isSuccess,
        isLoading,
        message
    } = useSelector((state) => state.tickets);

    const {
        notes,
        isLoading: notesIsLoading,
    } = useSelector((state) => state.notes);

    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { ticketId } = useParams();

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        dispatch(getTicket(ticketId));
        dispatch(getNotes(ticketId));
    }, [isError, message, ticketId]);

    const onTicketClose = () => {
        dispatch(closeTicket(ticketId));
        toast.success('Ticket closed.');
        navigate('/tickets');
    };

    if (isLoading || notesIsLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <h3>Something went wrong.</h3>;
    }

    return (
        <div className='ticket-page'>
            <header className='ticket-header'>
                <BackButton url='/tickets' />
                <h2>
                    Ticket ID: {ticket._id}
                    <span className={`status status-${ticket.status}`}>
                        {ticket.status}
                    </span>
                </h2>
                <h3>Date Submitted: {new Date(ticket.createdAt).toLocaleString('en-US')}</h3>
                <h3>Product: {ticket.product}</h3>
                <hr />
                <div className='ticket-desc'>
                    <h3>Description of Issue</h3>
                    <p>{ticket.description}</p>
                </div>
                <h2>Notes</h2>
            </header>

            {notes.length === 0 ? (
                <span>No notes yet.</span>
            ) : (
                notes.map((note) => (
                    <NoteItem key={note._id} note={note} />
                ))
            )}

            {ticket.status !== 'closed' && (
                <button onClick={onTicketClose} className='btn btn-block btn-danger'>Close Ticket</button>
            )}
        </div>
    );
};

export default Ticket;