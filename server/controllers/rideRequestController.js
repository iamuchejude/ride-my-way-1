import { RideOffers } from '../dataStore/RideOffers';
import { RideRequests } from '../dataStore/RideRequests';

/**
 * controller class to handle REST routes for ride requests
 *
 * @export
 * @class RideRequest
 */
export default class RideRequest {
  /**
   * create a new ride request
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @returns {json} json object with status and response message
   * @memberof RideRequest
   */
  static createRequest(req, res) {
    const rideId = parseInt(req.params.rideId, 10);
    // rather than loop through entire ride offer collection
    // get their id's and use Array.prototype.includes() to
    // check if rideId exists in collection
    const allRideOffersIds = RideOffers.map((rideOffer) => {
      return rideOffer.id;
    });
    if (!allRideOffersIds.includes(rideId)) {
      return res.status(404).json({
        status: 'error',
        message: 'The requested ride offer does not exist',
      });
    }
    const { userId } = req.body;
    // coerce both values to numbers, then compare with strice equality
    if (+RideOffers[rideId - 1].userId === +userId) {
      return res.status(422).json({
        status: 'error',
        message: 'You can not request for a ride you offered',
      });
    }
    RideRequests.push({
      id: RideRequest.length + 1,
      ride: rideId,
      userId,
    });
    return res.status(201).json({
      status: 'success',
      message: 'request to join ride successful',
    });
  }
}
