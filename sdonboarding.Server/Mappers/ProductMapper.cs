using sdonboarding.Server.Models;

namespace sdonboarding.Server.Mappers
{
    public class ProductMapper
    {

        public static Product DtoToEntity(Dtos.ProductDto productDto)
        {
            var entity = new Product
            {
                Id = productDto.Id,
                Name = productDto.Name,
                Price = productDto.Price

            };

            return entity;
        }

        public static Dtos.ProductDto EntityToDto(Product product)
        {
            var dto = new Dtos.ProductDto
            {
                Id = product.Id,
                Name = product.Name,
                Price = product.Price

            };

            return dto;
        }





    }
}
