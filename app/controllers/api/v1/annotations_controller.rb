module Api
  module V1
    class AnnotationsController < ApplicationController
      respond_to :json

      def index
        all = Annotation.sma_ohlc_data
        respond_with all
      end
    end
  end
end
