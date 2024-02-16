import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistsService } from './artists.service';
import idIsUUID from '../utils/idIsUUID';
import { cleanStringExtraSpaces } from '../utils/cleanStringExtraSpaces';

@Controller('artists')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}
  @Get()
  getAllArtists(@Query('total') total?: number) {
    return this.artistsService.getAllArtists(total);
  }

  @Get(':id')
  getArtistById(@Param() { id }: idIsUUID) {
    return this.artistsService.getArtistById(id);
  }

  @Post()
  async createArtist(@Body() artistDto: CreateArtistDto) {
    const cleanedName: string = cleanStringExtraSpaces(artistDto.name);
    artistDto.name = cleanedName;
    const cleanedGenres: string[] = artistDto.genres.map((s) =>
      cleanStringExtraSpaces(s),
    );
    artistDto.genres = cleanedGenres;

    return this.artistsService.createArtistWithGenres(artistDto);
  }

  @Patch(':id')
  async updateArtist(
    @Param() { id }: idIsUUID,
    @Body() artist: UpdateArtistDto,
  ) {
    return this.artistsService.updateArtist(id, artist);
  }

  @Delete(':id')
  async deleteArtist(@Param() { id }: idIsUUID) {
    return this.artistsService.deleteArtist(id);
  }
}