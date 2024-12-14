using sdonboarding.Server.Models;

namespace sdonboarding.Server.Mappers
{
    public class StoreMapper
    {

        public static Store DtoToEntity(Dtos.StoreDto storeDto)
        {
            var entity = new Store
            {
                Id = storeDto.Id,
                Name = storeDto.Name,
                Address = storeDto.Address

            };

            return entity;
        }

        public static Dtos.StoreDto EntityToDto(Store store)
        {
            var dto = new Dtos.StoreDto
            {
                Id = store.Id,
                Name = store.Name,
                Address = store.Address

            };

            return dto;
        }

    }
}
