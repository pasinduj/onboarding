using sdonboarding.Server.Models;

namespace sdonboarding.Server.Mappers
{
    public class SalesMapper
    {

        public static Sale DtoToEntity(Dtos.SalesDto salesDto)
        {
            var entity = new Sale
            {
                Id = salesDto.Id,
                CustomerId = salesDto.CustomerId,
                ProductId = salesDto.ProductId,
                StoreId = salesDto.StoreId,
                DateSold = salesDto.DateSold

            };

            return entity;
        }

        public static Dtos.SalesDto EntityToDto(Sale sale)
        {
            var dto = new Dtos.SalesDto
            {
                Id = sale.Id,
                CustomerId = sale.CustomerId,
                ProductId = sale.ProductId,
                StoreId = sale.StoreId,
                DateSold = sale.DateSold


            };

            return dto;
        }




    }
}
