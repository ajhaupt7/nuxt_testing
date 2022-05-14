import * as mockQuery from '~/apollo/mocks/get-user-and-plans.json';
import getUserAndPlans from '~/apollo/queries/get-user-and-plans.gql';
import advancedGetUserAndPlans from '~/apollo/queries/advanced-get-user-and-plans.gql';
import { DocumentNode } from 'graphql'
import { UserAndPlansResponse } from '~/apollo/types/user-and-plans-response';

type Query = (options: { 
  query: DocumentNode; 
  variables: { 
    dateFilter?: string;
    dateFilterOnEmpty?: string;
    page?: number;
    username: string
  } 
}) => Promise<{ data: any }>;

export async function fetchUserAndPlans(
  username: string, 
  query: Query, 
  options: { useMockData?: boolean, useAdvancedQuery?: boolean } = {},
): Promise<UserAndPlansResponse> {
  console.log({ query });
  if (options.useMockData) {
    return new Promise(resolve => {
      setTimeout(() => resolve(mockQuery.data), 2000);
    });
  }

  try {
    const { data } = await query({
      query: options.useAdvancedQuery ? advancedGetUserAndPlans : getUserAndPlans,
      variables: {
        dateFilter: "upcoming",
        dateFilterOnEmpty: "past",
        page: 0,
        username,
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
    console.error(e);

    return mockQuery.data;
  }
}