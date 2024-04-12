import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Row, Col, ListGroup, Image, Button, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import {
  useGetClientIDQuery,
  useGetReservationByIdQuery,
  usePayReservationMutation,
  useCancelReservationMutation,
  useUpdateStatusMutation,
} from "../slices/reservationSlice";
function ReservationScreen() {
  const { userInfo } = useSelector((state) => state.auth);
  const { id: reservationId } = useParams();
  const {
    data: reservation,
    refetch,
    isLoading,
    error,
  } = useGetReservationByIdQuery(reservationId);

  const [updateStatus, { isLoading: loadingstatus }] =
    useUpdateStatusMutation();

  const [payReservation, { isLoading: loadingPay }] =
    usePayReservationMutation();

  const [cancelReservation, { isLoading: loadingCancel }] =
    useCancelReservationMutation();

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetClientIDQuery();

  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal.clientId) {
      const loadPayPalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": paypal.clientId,
            currency: "USD",
          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };
      if (reservation && !reservation.isPaid) {
        if (!window.paypal) {
          loadPayPalScript();
        }
      }
    }
  }, [reservation, paypal, paypalDispatch, loadingPayPal, errorPayPal]);

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        await payReservation({ reservationId, details });
        refetch();
        window.alert("payment successful");
      } catch (err) {
        window.alert(err?.data?.message || err.message);
      }
    });
  }
  function onError(err) {
    window.alert(err?.data?.message || err.message);
  }
  const onApprovetest = async () => {
    try {
      await cancelReservation(reservationId);
      refetch();
      window.alert("reservation is canceled");
    } catch (err) {
      window.alert(err?.data?.message || err.message);
    }
  };
  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: reservation.totalPrice,
            },
          },
        ],
      })
      .then((orderId) => {
        return orderId;
      });
  }

  const Onclickhandler = async () => {
    await updateStatus(reservationId);
    refetch();
  };

  return isLoading ? (
    <p>Loading...</p>
  ) : error ? (
    <p>
      {error?.message?.data} || {error?.error}
    </p>
  ) : (
    <>
      <h1>Reservation Details: </h1>
      <Row>
        <Col md={8}>
          <ListGroup className="my-3">
            <ListGroup.Item>
              <h4>
                Reservation ID: <strong>{reservation._id}</strong>
              </h4>
            </ListGroup.Item>

            <ListGroup.Item>
              <h4>
                Reserved By:{" "}
                <strong>
                  {reservation.user.firstName} {reservation.user.lastName}
                </strong>
              </h4>
            </ListGroup.Item>
            <ListGroup.Item>
              <h4>Room Details:</h4>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col md={4}>
                      <Image
                        src={`http://localhost:5000${reservation.reservation.image}`}
                        alt={reservation.reservation.title}
                        fluid
                        rounded
                      />
                    </Col>
                    <Col className="py-1">
                      <h5 className="py-1">
                        <strong>{reservation.reservation.title}</strong>
                      </h5>
                      <h6 className="py-1">
                        CheckIn Date: <strong>{reservation.checkInDate}</strong>
                        - CheckOut Date:{" "}
                        <strong>{reservation.checkOutDate}</strong>
                      </h6>
                      <h6 className="py-1">
                        CheckIn Time: <strong>11:00 AM</strong>- CheckOut Time:{" "}
                        <strong>01:00 PM</strong>
                      </h6>
                      <h6 className="py-1">
                        Reservation Status:{" "}
                        {reservation.reservationStatus === "Canceled" && (
                          <strong style={{ color: "red" }}>
                            {reservation.reservationStatus}
                          </strong>
                        )}
                        {reservation.reservationStatus === "Reserved" && (
                          <strong style={{ color: "blue" }}>
                            {reservation.reservationStatus}
                          </strong>
                        )}
                        {reservation.reservationStatus === "CheckedIn" && (
                          <strong style={{ color: "green" }}>
                            {reservation.reservationStatus}
                          </strong>
                        )}
                        {reservation.reservationStatus === "CheckedOut" && (
                          <strong style={{ color: "orange" }}>
                            {reservation.reservationStatus}
                          </strong>
                        )}
                      </h6>
                    </Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </ListGroup.Item>
          </ListGroup>

          {userInfo.role !== "user" && (
            <>
              {reservation.reservationStatus === "Reserved" && (
                <Button
                  onClick={Onclickhandler}
                  className="px-2"
                  variant="dark"
                >
                  Mark As Checked-In
                </Button>
              )}
              {reservation.reservationStatus === "CheckedIn" && (
                <Button onClick={Onclickhandler} variant="dark">
                  Mark As Checked-Out
                </Button>
              )}
            </>
          )}

          {loadingstatus && <p>Loading...</p>}
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Payment Info</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Room Price</Col>
                  <Col>${reservation.roomPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${reservation.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${reservation.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {reservation.reservationStatus === "Reserved" &&
                reservation.isPaid && (
                  <>
                    <Button onClick={onApprovetest}>Cancel</Button>
                    {loadingCancel && <p>Canceling...</p>}
                  </>
                )}
              {!reservation.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <p>Loading...</p>}
                  {isPending ? (
                    <p>Loading...</p>
                  ) : (
                    <div>
                      <div>
                        <PayPalButtons
                          createOrder={createOrder}
                          onApprove={onApprove}
                          onError={onError}
                        ></PayPalButtons>
                      </div>
                    </div>
                  )}
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default ReservationScreen;
