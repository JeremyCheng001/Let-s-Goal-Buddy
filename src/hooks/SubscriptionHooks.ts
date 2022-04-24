import { API, graphqlOperation } from "aws-amplify";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FriendShip, User } from "../API";
import {
  onCreateFriendShip,
  onDeleteFriendShip,
} from "../graphql/subscriptions";
import { RootState } from "../store/store";
import * as GoalBuddiesReducer from "../store/GoalBuddiesReducer";

/**
 * subscription needs to be called on the higher level, instead of putting them on a specific component, it may cause issues when user haven't navigated to that screen yet
 */
export function useFriendshipSubscription() {
  const dispatch = useDispatch();
  const user: User = useSelector((state: RootState) => state.userReducer);
  useEffect(() => {
    const subscription_createFriendship = API.graphql(
      graphqlOperation(onCreateFriendShip)
      // @ts-ignore
    ).subscribe({
      next: ({ provider, value }: any) => {
        const createdFriendship: FriendShip = value.data.onCreateFriendShip;
        if (
          createdFriendship &&
          createdFriendship.friendShipUserId === user.id
        ) {
          if (createdFriendship) {
            dispatch(GoalBuddiesReducer.addFriendship(createdFriendship));
          }
        }
      },
    });

    const subscription_deleteFriendship = API.graphql(
      graphqlOperation(onDeleteFriendShip)
      // @ts-ignore
    ).subscribe({
      next: ({ provider, value }: any) => {
        const deletedFriendship: FriendShip = value.data.onDeleteFriendShip;
        if (
          deletedFriendship &&
          deletedFriendship.friendShipUserId === user.id
        ) {
          if (value.data.onDeleteFriendShip) {
            dispatch(GoalBuddiesReducer.deleteFriendship(deletedFriendship));
          }
        }
      },
    });

    return () => {
      subscription_createFriendship.unsubscribe();
      subscription_deleteFriendship.unsubscribe();
    };
  }, [user.id]);
}
