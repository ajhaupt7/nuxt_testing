import * as mockQuery from '~/apollo/mocks/get-user-and-plans.json';
import getUserAndPlans from '~/apollo/queries/get-user-and-plans.gql';
import { DocumentNode } from 'graphql'
import { UserAndPlansResponse } from '~/apollo/types/user-and-plans-response';

type Query = (options: { 
  query: DocumentNode; 
  variables: { username: string } 
}) => Promise<{ data: any }>;

export async function fetchUserAndPlans(
  username: string, 
  query: Query, 
  useMockData: boolean,
): Promise<UserAndPlansResponse> {
  if (useMockData) {
    return mockQuery.data;
  }

  try {
    const { data } = await query({
      query: getUserAndPlans,
      variables: {
        username: username,
      },
    });
    
    if (!data.user) {
      throw new Error('No user found.');
    }

    return {
      userPlans: data.userPlans,
      user: data.user,
    };
  } catch (e) {
    throw e;
  }
}