module Api
  module V1
    class OrderBooksController < ApplicationController
      respond_to :json

      def index
        all = OrderBook.all.order(:id)
        respond_with all
      end
    end
  end
end
