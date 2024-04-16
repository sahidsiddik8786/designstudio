import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import moment from "moment";
import {
  TextField,
  Button,
  Typography,
  Container,
  Grid,
  Dialog,
  DialogContent,
  DialogTitle,
  Select,
  MenuItem,
  FormControl,
  DialogActions,
} from "@mui/material";
import Sidebar from "./Sidebar";
import StaffHeader from "./StaffHeader";
import Calendar from "./Calendar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./customCalendarStyle.css";
import { useAuth } from "../../context/auth";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";

const AddAppointment = () => {
  const [auth, setAuth] = useAuth();
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [date, setDate] = useState("");
  const [slots, setSlots] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [events, setEvents] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [googleMeetLink, setGoogleMeetLink] = useState("");

  const [rescheduleDialogOpen, setRescheduleDialogOpen] = useState(false);
  const [rescheduleEventId, setRescheduleEventId] = useState(null);
  const [newRescheduleDate, setNewRescheduleDate] = useState("");
  const [newRescheduleStartTime, setNewRescheduleStartTime] = useState("");

  const generateTimeSlots = () => {
    return [
      { startTime: "10:00am", endTime: "11:00am" },
      { startTime: "11:00am", endTime: "12:00pm" },
      { startTime: "2:00pm", endTime: "3:00pm" },
      { startTime: "3:00pm", endTime: "4:00pm" },
    ];
  };

  useEffect(() => {
    setSlots(generateTimeSlots());
    fetchScheduledSlots();
  }, []);

  const fetchScheduledSlots = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/slots");
      console.log(response.data);
      setEvents(response.data);
      // Update slots state after fetching scheduled slots
      setSlots(generateTimeSlots());
    } catch (error) {
      console.error("Error fetching scheduled slots: ", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the user is authenticated
    if (!auth.user) {
      // Display an error toast using react-hot-toast
      toast.error("You are not authenticated. Please log in.");
      return;
    }

    const alreadyBooked = events.some(
      (event) =>
        moment(event.date).format("YYYY-MM-DD") === date &&
        event.isBooked &&
        event.bookedBy === auth.user._id
    );

    if (alreadyBooked) {
      toast.error("You can only book one slot per day.");
      return;
    }

    // Validate if the same time slot is already booked for the selected date
    const existingSlot = events.find(
      (event) =>
        moment(event.date).format("YYYY-MM-DD") === date &&
        event.startTime === slots[0].startTime
    );

    if (existingSlot) {
      setErrorMessage(
        "This time slot is already booked for the selected date."
      );
      return;
    }

    // Validate if more than 3 appointments are scheduled for the selected date
    const appointmentsForSelectedDate = events.filter(
      (event) => moment(event.date).format("YYYY-MM-DD") === date
    );

    if (appointmentsForSelectedDate.length >= 3) {
      setErrorMessage("Only 3 appointments can be scheduled for this date.");
      return;
    }

    // In handleSubmit method
    const schedule = {
      staffId: auth.user._id, // Changed from auth.user.staffId to auth.user._id
      date,
      slots: [
        {
          startTime: slots[0].startTime,
          endTime: slots[0].endTime,
          isBooked: false,
        },
      ],
      googleMeetLink,
    };

    try {
      await axios.post("http://localhost:8080/api/appointment", schedule);
      setSuccessMessage("Schedule created successfully!");
      toast.success("Schedule created successfully!");
      setDate("");
      setSlots([]);
      fetchScheduledSlots();
    } catch (error) {
      setErrorMessage("Failed to create schedule");
      console.error("Error creating schedule: ", error);
    }
  };

  const handleSelectDate = (date) => {
    setDate(moment(date).format("YYYY-MM-DD"));
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleTimeChange = (event) => {
    const selectedSlot = slots.find(
      (slot) => slot.startTime === event.target.value
    );
    setSlots([selectedSlot]);
  };
  const handleReschedule = (eventId) => {
    console.log("Rescheduling event with ID:", eventId);
    setRescheduleEventId(eventId);
    setRescheduleDialogOpen(true);
  };

  const handleRescheduleConfirm = async () => {
    if (!newRescheduleDate || !newRescheduleStartTime) {
      setErrorMessage("Please select a new date and time.");
      return;
    }
    const durationInHours = 1;
    const startTimeMoment = moment(newRescheduleStartTime, "HH:mm");
    const endTimeMoment = startTimeMoment.clone().add(durationInHours, "hours");
    const newEndTime = endTimeMoment.format("HH:mm");

    try {
      await axios.put(
        `http://localhost:8080/api/appointment/${rescheduleEventId}/reschedule`,
        {
          date: newRescheduleDate,
          slots: [
            {
              startTime: newRescheduleStartTime,
              endTime: newEndTime,
              isBooked: false,
            },
          ],
        }
      );
      setSuccessMessage("Appointment rescheduled successfully!");
      toast.success("Appointment rescheduled successfully!");
      fetchScheduledSlots();
    } catch (error) {
      setErrorMessage("Failed to reschedule appointment");
      console.error("Error rescheduling appointment: ", error);
    }
    setRescheduleDialogOpen(false);
  };

  const handleRescheduleDialogClose = () => {
    setRescheduleDialogOpen(false);
  };

  const sidebarStyle = {
    width: "260px",
    height: "100vh",
    position: "fixed",
    left: 0,
    top: 0,
    bottom: 0,
    overflowY: "auto",
    background: "#333",
    zIndex: 1,
  };
  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div>
      <div style={sidebarStyle}>
        <Sidebar
          openSidebarToggle={openSidebarToggle}
          OpenSidebar={() => setOpenSidebarToggle(!openSidebarToggle)}
        />
      </div>
      <StaffHeader />
      <Container>
        <Grid item xs={0} md={6}>
          <Calendar handleSelectDate={handleSelectDate} />
        </Grid>

        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Add New Appointment</DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    disabled
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <Select
                      labelId="time-slot-label"
                      id="time-slot"
                      value={slots.length > 0 ? slots[0].startTime : ""}
                      label="Time Slot"
                      onChange={handleTimeChange}
                      required
                    >
                      {slots.map((slot, index) => (
                        <MenuItem key={index} value={slot.startTime}>
                          {slot.startTime} - {slot.endTime}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
  <TextField
    fullWidth
    label="Google Meet Link"
    type="text"
    value={googleMeetLink}
    onChange={(e) => setGoogleMeetLink(e.target.value)}
    required
  />
</Grid>

                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary">
                    Create Schedule
                  </Button>
                </Grid>
              </Grid>
              {errorMessage && (
                <Typography color="error">{errorMessage}</Typography>
              )}
              {successMessage && (
                <Typography color="success">{successMessage}</Typography>
              )}
            </form>
          </DialogContent>
        </Dialog>

        <Dialog
          open={rescheduleDialogOpen}
          onClose={handleRescheduleDialogClose}
        >
          <DialogTitle>Reschedule Appointment</DialogTitle>
          <DialogContent>
            <TextField
              type="date"
              value={newRescheduleDate}
              onChange={(e) => setNewRescheduleDate(e.target.value)}
              fullWidth
            />
            <Grid item xs={12}>
              <FormControl fullWidth>
                <Select
                  labelId="time-slot-label"
                  id="time-slot"
                  value={slots.length > 0 ? slots[0].startTime : ""}
                  label="Time Slot"
                  onChange={handleTimeChange}
                  required
                >
                  {slots.map((slot, index) => (
                    <MenuItem key={index} value={slot.startTime}>
                      {slot.startTime} - {slot.endTime}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleRescheduleDialogClose}>Cancel</Button>
            <Button onClick={handleRescheduleConfirm}>Confirm</Button>
          </DialogActions>
        </Dialog>

        <div className="mt-0">
          <h1>Scheduled Slots</h1>
          <table>
            <thead>
              <tr>
                <th style={{ textAlign: "center" }}>Date</th>
                <th style={{ textAlign: "center" }}>Start Time</th>
                <th style={{ textAlign: "center" }}>End Time</th>
                <th style={{ textAlign: "center" }}>Actions</th>
                <th style={{ textAlign: "center" }}>Booked user details</th>
              </tr>
            </thead>

            <tbody>
              {events.map((event, index) => (
                <tr key={index}>
                  <td style={{ textAlign: "center" }}>
                    {formatDate(event.date)}
                  </td>
                  <td style={{ textAlign: "center" }}>{event.startTime}</td>
                  <td style={{ textAlign: "center" }}>{event.endTime}</td>
                  <td style={{ textAlign: "center" }}>
                    {event.isBooked ? (
                      <div>Booked</div>
                    ) : (
                      <Button
                        className="mt-1"
                        onClick={() => handleReschedule(event.slotId)}
                        style={{ backgroundColor: "green", color: "white" }}
                      >
                        Reschedule
                      </Button>
                    )}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {event.isBooked ? (
                      <>
                        <button
                          onClick={toggleDetails}
                          className="eye-opener-button"
                        >
                          <FontAwesomeIcon icon={faEye} />{" "}
                      View Details
                        </button>
                        {showDetails && (
                          <>
                            <div>
                              {event.bookedBy.firstname}{" "}
                              {event.bookedBy.lastname}
                            </div>
                  
                            <div>Email: {event.bookedBy.email}</div>
                            <div>Phone: {event.bookedBy.phone}</div>
                            <div>Meet Link: {event.googleMeetLink}</div>
                            <Link to={`/user/${event.bookedBy._id}/images`}>View User Images</Link>
                          </>
                        )}
                      </>
                    ) : (
                      <div>Not Booked</div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </div>
  );
};
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0"); // Ensure 2-digit day
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Ensure 2-digit month (0-indexed)
  const year = date.getFullYear().toString().slice(-2); // Get last 2 digits of the year
  return `${day}-${month}-${year}`;
};
export default AddAppointment;
