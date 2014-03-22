require 'spec_helper'

describe "IndexController (this is a skeleton controller test!)" do

  describe '/surveys' do
    it 'should see all surveys' do
      get "/"
      expect(last_response).to be_ok
    end
  end

  # describe 'create a new band' do
  #   band_name = 'chromatics'
  #   new_params = {
  #       name: band_name
  #     }
  #   new_session = {
  #     'rack.session' => {
  #       # Could preload stuff into the session here...
  #     }
  #   }
  #   it 'should add a new band' do
  #     expect{
  #       post('/bands', new_params, new_session)
  #     }.to change(Band, :count).by(1)
  #     last_response.should be_redirect
  #   end
  # end
end
